import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import socket from './socket.js';

export default function App() {
  const { username } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: username
    };
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
    setMessage(''); // Limpiar el input después de enviar el mensaje
  };

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, [messages]); // Asegúrate de incluir 'messages' en la dependencia del useEffect

  useEffect(() => {
    // Desplazar automáticamente el scroll hacia abajo al recibir un nuevo mensaje
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  return (
    <div className='h-screen bg-zinc-800 text-white flex flex-col items-center justify-center'>
      <h2 className='text-2xl mb-4'>¡Bienvenido, {username}!</h2>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-6 rounded-lg w-96'>
        <ul id='chat-container' className='max-h-60 overflow-y-auto pr-4'>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md ${message.from === username ? 'bg-green-600 ml-auto' : 'bg-white text-black'
                }`}
            >
              <b className='block'>{message.from}</b> {message.body}
            </li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='Escribe tu mensaje'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border-2 border-zinc-500 p-2 w-full text-black mt-4 mr-2'
        ></input>
      </form>
    </div>
  );
}
