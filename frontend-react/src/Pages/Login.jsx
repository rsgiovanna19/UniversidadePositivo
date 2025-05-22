import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useError } from '../Context/ErrorContext';
import { useMessage } from '../Context/MessageContext';
import ErrorMessage from '../Components/ErrorMessage';
import Message from '../Components/Message';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.98, y: -30, transition: { duration: 0.3, ease: 'easeIn' } }
};

export default function Login() {
  const { showError, errorMsg, clearError } = useError();
  const { message, clearMessage } = useMessage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', senha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      showError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/usuario/validar-login", formData);
      const user = response.data;

      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("logado", true);
      localStorage.setItem("userType", user.tipo);
      localStorage.setItem("user", user.id);
      localStorage.setItem("userName", user.nome);
      navigate('/home');
    } catch (error) {
      showError("Erro ao fazer login: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-4 py-8 text-blue-900">
      {errorMsg && <ErrorMessage msg={errorMsg} onClose={clearError} />}
      {message && <Message msg={message} onClose={clearMessage} />}

      <motion.div
        className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-blue-100 grid grid-cols-10 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Lado esquerdo com imagem */}
        <div className="col-span-4 bg-blue-100 hidden md:flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Logo Biomedicina"
            className="w-72 object-contain"
          />
        </div>

        {/* Formulário */}
        <div className="col-span-10 md:col-span-6 p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-6 md:hidden">
            <img
              src="/logo.png"
              alt="Logo Biomedicina"
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-semibold text-blue-900 text-center mb-4">
            Acesso ao Sistema
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Faça login com suas credenciais institucionais
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email institucional</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-700 outline-none transition text-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={e => setFormData({ ...formData, senha: e.target.value })}
                className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-700 outline-none transition text-blue-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition"
            >
              Entrar
            </button>

            <p className="text-center text-sm text-gray-500">
              Ainda não possui uma conta? <a href="/cadastro" className="underline text-blue-700">Cadastre-se aqui</a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
