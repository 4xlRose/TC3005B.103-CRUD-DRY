import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Historial from './pages/Historial';
import NuevoLibro from './pages/NuevoLibro';
import EditarLibro from './pages/EditarLibro';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // lo usaremos para personalización extra

function App() {
  return (
    <Router>
      <div className="d-flex min-vh-100 bg-dark text-light">
        <nav className="bg-black p-3" style={{ width: '250px' }}>
          <h4 className="text-light mb-4">
            <i className="bi bi-book-half me-2"></i>Book Tracker
          </h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-light">
                <i className="bi bi-person-circle me-2"></i>Inicio
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/historial" className="nav-link text-light">
                <i className="bi bi-journal-text me-2"></i>Historial
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/nuevo" className="nav-link text-light">
                <i className="bi bi-plus-circle me-2"></i>Nuevo Libro
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/nuevo" element={<NuevoLibro />} />
            <Route path="/editar/:id" element={<EditarLibro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
