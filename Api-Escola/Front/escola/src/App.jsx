import React from 'react'
import './App.css'

export default function App() {
  return (
    <section>
      <h1>Login</h1>
      <form>
        <label for="name">
          <span>Nome:</span>
        </label><br></br>
        <input type="text" name="nome" autocomplete="off" required placeholder='Digite seu nome' /><br></br>
        <label for="name"><br></br>
          <span>Senha:</span>
        </label><br></br>
        <input  type="password" name="senha" autocomplete="off" required placeholder='Digite sua senha' />
      </form>
      <button>Entrar</button>
    </section>
  )
}