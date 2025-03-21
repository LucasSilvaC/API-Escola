import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Pages/Login';
import Subject from "./componentes/Pages/subject";
import Home from './componentes/Pages/home';
import Curso from './componentes/Pages/cursos.jsx';
import Turma from './componentes/Pages/turmas.jsx';
import Ambiente from './componentes/Pages/ambientes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/ambiente" element={<Ambiente />} />
        <Route path="/cursos" element={<Curso />} />
        <Route path="/turmas" element={<Turma />} />
      </Routes>
    </Router>
  );
}