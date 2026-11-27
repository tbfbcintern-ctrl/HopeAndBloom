import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AdminPage } from './components/AdminPage.jsx';
import './styles/index.css';

const isAdminPage = window.location.pathname.replace(/\/+$/, '') === '/admin';
createRoot(document.getElementById('root')).render(isAdminPage ? <AdminPage /> : <App />);
