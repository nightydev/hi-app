import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import socket from './socket.js';

export default function Username() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleUsernameSelection() {
    socket.emit('username', username);
    navigate(`/app/${username}`);
  }

  return (
    <div className='h-screen bg-zinc-800 text-white flex flex-col items-center justify-center'>
      <h1 className="text-6xl font-extrabold mb-8">Hi!</h1>
      <h2 className="text-2xl font-semibold mb-4">¿Cómo te llamas?</h2>
      <input
        className="bg-gray-700 text-white px-4 py-2 mb-4 rounded-md"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu nombre aquí :)"
      />
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        onClick={handleUsernameSelection}
      >
        Continuar
      </button>
    </div>
  );
}
