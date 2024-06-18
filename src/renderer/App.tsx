import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Palet from './Components/Palet/Palet';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path="/palet" element={<Palet />} />
        </Route>
      </Routes>
    </Router>
  );
}
