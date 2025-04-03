import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import PostWrite from './pages/PostWrite';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/write" element={<PostWrite />} />
        <Route path="/list" element={<PostList />} />
        <Route path="/detail/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostEdit />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
