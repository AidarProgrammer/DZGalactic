import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { HomePage } from './pages/HomePage/HomePage'
import { TableGenerator } from './pages/TableGeneratorPage/TableGenerator'
import { HistoryPage } from './pages/HistoryPage/HistoryPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table-generator" element={<TableGenerator />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
