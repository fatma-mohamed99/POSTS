import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

const PostList = () => {
  const { posts, deletePost } = useContext(PostsContext);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUserId(localStorage.getItem('userId'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Link to="/add" className="p-2 bg-amber-900 text-white rounded-full shadow-lg cursor-pointer hover:bg-violet-900 m-2">
          Add New Post
        </Link>
      </div>
      <ul className="flex flex-col gap-6">
        {posts.map(post => (
          <li key={post.id} className="bg-violet-600 bg-opacity-35 p-7 rounded shadow-violet-950 shadow-md md:w-4/6 m-auto hover:cursor-pointer hover:scale-110 flex relative sm:w-full">
            <div className="w-3/4 h-1/2 me-7 flex">
              <img src={post.image} alt={post.title} className="sm:rounded-full md:rounded w-full h-full" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 font-serif">{post.description}</p>
            </div>
            {post.userId === currentUserId && (
              <div className="ms-4">
                <Link to={`/edit/${post.id}`} className="block p-2 bg-amber-900 text-white rounded shadow-lg cursor-pointer hover:bg-violet-900 absolute end-0 m-2">
                  Edit
                </Link>
                <button
                  className="block p-2 bg-red-900 text-white rounded shadow-lg cursor-pointer hover:bg-fuchsia-900"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
