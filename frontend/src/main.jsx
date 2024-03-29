import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Username from './components/Username.jsx';
import NotFound from './components/NotFound.jsx';
import App from './components/App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Username />} />
      <Route path="/app/:username" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)
