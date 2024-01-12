import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import './App.css';

const socket = io('/');

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Tú'
    };
    setMessages([...messages, newMessage]);
    socket.emit('message', message);
  };

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  const receiveMessage = message => setMessages(state => [...state, message]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Escribe tu mensaje' onChange={(e) => setMessage(e.target.value)}></input>
        <button>Enviar</button>
      </form>
      <ul>
        {
          messages.map((message, i) => (
            <li key={i}>
              {message.from}: {message.body}
            </li>
          ))
        }
      </ul>
    </div>
  );
}
