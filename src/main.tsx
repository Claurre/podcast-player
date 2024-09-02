import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from './Componentes/Header.tsx'
import ListenAgain from './Componentes/ListenAgain.tsx'
import SimilarArtist from './Componentes/SimilarArtist.tsx'
import RecomendenAlbum from './Componentes/RecomendedAlbums.tsx'
import AppTP2 from './Componentes/TP2/AppTP2.tsx'
import Sidebar from './Componentes/TP2/Sidebar.tsx'
import Formulario from './Componentes/TP2/Formulario.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTP2/>
  </React.StrictMode>,
)
