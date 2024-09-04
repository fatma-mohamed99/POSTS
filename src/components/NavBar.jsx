import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate('/login');
    });
  };

  const getEmailPrefix = (email) => {
    return email ? email.split('@')[0] : 'Guest';
  };

  return (
    <div className=" bg-fuchsia-900  flex items-center  overflow-x-hidden p-2 shadow-sm shadow-violet-950  ">
        <Link to="/">
        <div className=" font-serif p-2 border border-fuchsia-950 text-white rounded-full cursor-pointer hover:bg-violet-900 mt-2">Home </div>
          </Link>
       
      <div className="flex-1 flex justify-center">
        <span className="text-white font-serif">
          {user ? `Hello : ${getEmailPrefix(user.email)}` : 'Hello : Guest'}
        </span>
      </div>
      <div className="flex-none">
        {user ? (
          <>
            <div className="p-2  text-white rounded   mt-2">
              Email: {user.email}
            </div>
            <div
              className="p-2 border border-fuchsia-950 text-white rounded cursor-pointer hover:bg-violet-900 mt-2"
              onClick={handleLogout}
            >
              Logout
            </div>
          </>
        ) : (
          <Link to="/login">
            <div className="p-2 bg-amber-900 text-white rounded-full shadow-lg cursor-pointer hover:bg-violet-900 m-2">
              Login
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
