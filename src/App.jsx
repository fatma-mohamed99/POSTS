import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostsProvider } from './contexts/PostsContext';
import PostList from './components/PostList';
import AddOrEditPost from './components/AddOrEditPost';
import LoginRegister from './components/LoginRegister';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import TokenForUser from './components/FirebaseToken/TokenForUser';

export default function App() {

  return (
    <div className='bg-slate-200'>
    <PostsProvider>
      
      <Router>
      <TokenForUser />
      <Navbar/>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/add" element={<AddOrEditPost />} />
          <Route path="/edit/:id" element={<AddOrEditPost />} />
          <Route path="/login" element={<LoginRegister isLogin={true} />} /> 
          <Route path="/register" element={<LoginRegister isLogin={false} />} /> 
        </Routes>
        <Footer/>
      </Router>
    </PostsProvider>
    </div>
  );

};
