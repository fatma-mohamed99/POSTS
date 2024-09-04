import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    const postWithUserId = { ...newPost, userId };

    try {
      await axios.post('http://localhost:3000/posts', postWithUserId);
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error adding post:', error);
    }
  };

  const editPost = async (updatedPost) => {
    try {
      await axios.put(`http://localhost:3000/posts/${updatedPost.id}`, updatedPost);
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
