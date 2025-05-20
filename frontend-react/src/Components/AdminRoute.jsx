import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const logado = localStorage.getItem('userType');

  if (logado !== "1") {
    return <Navigate to="/login" />; // redireciona para login ou outra rota
  }

  return children;
}

export default AdminRoute;

