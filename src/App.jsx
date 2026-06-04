import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Sumadora from './pages/Sumadora'
import Traductor from './pages/Traductor'
import TablaMultiplicar from './pages/TablaMultiplicar'
import Experiencia from './pages/Experiencia'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las páginas comparten el Layout con el menú lateral */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="sumadora" element={<Sumadora />} />
          <Route path="traductor" element={<Traductor />} />
          <Route path="tabla" element={<TablaMultiplicar />} />
          <Route path="experiencia" element={<Experiencia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}