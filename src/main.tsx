import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from './Componentes/Header.tsx'
import ListenAgain from './Componentes/ListenAgain.tsx'
import SimilarArtist from './Componentes/SimilarArtist.tsx'
import RecomendenAlbum from './Componentes/RecomendedAlbums.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <ListenAgain/>
    <SimilarArtist/>
    <RecomendenAlbum/>
  </React.StrictMode>,
)
