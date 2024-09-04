import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

const AddOrEditPost = () => {
  const { id } = useParams();
  const { posts, addPost, editPost } = useContext(PostsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const currentUserId = localStorage.getItem('userId');
  const existingPost = id ? posts.find(post => post.id === id) : null;

  useEffect(() => {
    if (existingPost && existingPost.userId === currentUserId) {
      setTitle(existingPost.title);
      setDescription(existingPost.description);
      setImage(existingPost.image);
    } else if (existingPost && existingPost.userId !== currentUserId) {
      alert("You are not authorized to edit this post.");
      navigate('/');
    }
  }, [existingPost, currentUserId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      image,
      userId: currentUserId
    };

    if (existingPost) {
      await editPost({ ...postData, id: existingPost.id });
    } else {
      await addPost(postData);
    }

    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {existingPost ? 'Edit Post' : 'Add Post'}
        </h1>
        <label className="block mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input mt-2 block w-full border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea mt-2 block w-full border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Image URL:</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input mt-2 block w-full border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-amber-900 text-white px-4 py-2 rounded shadow-md hover:bg-violet-900"
        >
          {existingPost ? 'Update Post' : 'Add Post'}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditPost;
