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
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <h2>Selecciona tu nombre de usuario</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleUsernameSelection}>Continuar</button>
    </div>
  );
}
