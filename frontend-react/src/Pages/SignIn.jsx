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
      await axios.post("http://localhost:5294/api/usuario", formData);
      showMessage("Cadastro realizado com sucesso!");
      localStorage.setItem('userName', formData.nome); // <- AQUI!
      setFormData({ nome: '', email: '', senha: '' });
      clearError();
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      showError("Erro ao cadastrar: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1c1c1e] to-[#3a3a3c] px-4">
      {errorMsg && <ErrorMessage msg={errorMsg} onClose={clearError} />}
      {message && <Message msg={message} onClose={clearMessage} />}

      <motion.div
        className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Lado esquerdo com logo */}
        <div className="hidden md:flex items-center justify-center bg-white p-12">
          <img src="/logo.png" alt="EducaTech Logo" className="w-100 object-contain" />
        </div>

        {/* Lado direito: formulário */}
        <div className="p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-8 md:hidden">
            <img src="/logo.png" alt="EducaTech Logo" className="h-20 object-contain" />
          </div>
          <h1 className="text-3xl font-semibold text-[#1d1d1f] mb-6 text-center">Criar conta</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nome</label>
              <input type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Senha</label>
              <input type="password" value={formData.senha} onChange={e => setFormData({ ...formData, senha: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition" />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition">Cadastrar</button>
            <p className="text-center text-sm text-gray-500">Já tem uma conta? <a href="/login" className="underline text-black">Entrar</a></p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
