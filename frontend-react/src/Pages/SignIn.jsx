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

export default function SignIn() {
  const { showError, errorMsg, clearError } = useError();
  const { message, showMessage, clearMessage } = useMessage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.senha) {
      showError("Todos os campos são obrigatórios.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/usuario", formData);    //vreificar erro
      showMessage("Cadastro realizado com sucesso!");
      localStorage.setItem('userName', formData.nome);
      setFormData({ nome: '', email: '', senha: '' });
      clearError();
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      showError("Erro ao cadastrar: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen  bg-blue-700 flex items-center justify-center px-4 py-8">
      {errorMsg && <ErrorMessage msg={errorMsg} onClose={clearError} />}
      {message && <Message msg={message} onClose={clearMessage} />}

      <motion.div
        className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-gray-200 grid grid-cols-10 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Lado esquerdo com imagem */}
        <div className="col-span-4 bg-[#bbdefb] hidden md:flex items-center justify-center">
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

          <h2 className="text-3xl font-semibold text-[#1976d2] text-center mb-4">
            Criar Conta
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Preencha os campos abaixo para se cadastrar
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nome completo</label>
              <input
                type="text"
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1976d2] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email institucional</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1976d2] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={e => setFormData({ ...formData, senha: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1976d2] outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1976d2] text-white py-2 rounded-xl hover:bg-[#1565c0] transition"
            >
              Cadastrar
            </button>

            <p className="text-center text-sm text-gray-600">
              Já possui uma conta? <a href="/login" className="underline text-[#1976d2]">Entrar</a>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
