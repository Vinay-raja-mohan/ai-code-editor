import { useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainIDE from './pages/MainIDE';

function App() {
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainIDE />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;