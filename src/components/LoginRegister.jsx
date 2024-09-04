import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import SucessLoginUI from './Daisyomponent/SucessLoginUI';
import Error from './Daisyomponent/Erorr';

const LoginRegister = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(isLogin);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      let userCredential;
      if (isLoginMode) {
        userCredential=  await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Logged in successfully');      } 
        else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage('Registered successfully');
      }
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      localStorage.setItem('userId', idToken);

      
      setTimeout(() => {
        navigate('/');
      }, 2000);      
  
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>

    <div className="container mx-auto p-4 mt-5">
     <div className="container mx-auto p-4 mt-5 ">
    {successMessage && <SucessLoginUI message={successMessage} />}
    {errorMessage && <Error message={errorMessage} />}
    </div>
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{isLoginMode ? 'Login' : 'Register'}</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input  mt-2 block w-full border  border-gray-300 rounded h-12 "
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input  mt-2 block w-full border  border-gray-300 rounded h-12 "
            required
          />
        </label>
        <button
          onClick={handleSubmit}
          className="p-2 border border-fuchsia-950 text-black rounded shadow-lg cursor-pointer hover:bg-amber-800 ps-4 pe-5 hover:text-white "
        >
          {isLoginMode ? 'Login' : 'Register'}
        </button>
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="block mt-4 text-fuchsia-800 hover:underline"
        >
          {isLoginMode ? 'Need  account? Register' : 'Already have account? Login'}
        </button>
      </div>
    </div>
    </>
  );
};

export default LoginRegister;
