using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using UniversidadePositivo.Data;
using UniversidadePositivo.security; // Importe o namespace da sua pasta security
using Microsoft.AspNetCore.Authentication.JwtBearer; // Para JWT
using Microsoft.IdentityModel.Tokens; // Para SymmetricSecurityKey e TokenValidationParameters
using System.Text; // Para Encoding.UTF8

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot"
});

// Conexão com o banco de dados MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ********************************************************************************
// Adicionar as classes de segurança para injeção de dependência
// PasswordHasher tem métodos estáticos, então não precisa ser injetado, mas TokenGenerator precisa.
builder.Services.AddScoped<TokenGenerator>(); // Registra TokenGenerator como um serviço

// Configuração do JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, // Valida o emissor do token
        ValidateAudience = true, // Valida a audiência do token
        ValidateLifetime = true, // Valida a data de expiração
        ValidateIssuerSigningKey = true, // Valida a chave de assinatura do token

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        // A chave de assinatura para validar o token. Garanta que ela não seja nula.
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured in appsettings.json.")))
    };
});
// ********************************************************************************

// Controllers com configuração de JSON (evita ciclos de referência)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Universidade Positivo API",
        Version = "v1",
        Description = "API para gerenciamento UP"
    });

    // ********************************************************************************
    // Configuração para o Swagger reconhecer e enviar o token JWT
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    // ********************************************************************************
});

// CORS – Libera acesso externo à API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin() // Em produção, considere restringir para URLs específicas!
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Swagger e página de documentação
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Universidade Positivo API v1");
        options.RoutePrefix = string.Empty; // acessa direto na raiz
    });
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware padrão
app.UseRouting(); // Adicionado explicitamente para melhor controle de rotas
app.UseCors("AllowAll");

// ********************************************************************************
// A ordem é CRÍTICA aqui!
app.UseAuthentication(); // Deve vir ANTES de UseAuthorization
app.UseAuthorization();
// ********************************************************************************

app.UseStaticFiles(); // Geralmente usado para arquivos estáticos, pode vir antes ou depois da autenticação/autorização dependendo do que você serve.
app.MapControllers();

app.Run();