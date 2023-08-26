import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../context/LoadingContext';
import UserContext from '../context/UserContext';
import Button from './Button';
import Loading from './Loading';
import Logo from './Logo';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;
  const { loading, setLoading } = useContext(
    LoadingContext
  ) as LoadingContextType;
  const navigate = useNavigate();

  const authorizeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 400) {
      setHasError(true);
    } else {
      const userData: User = await response.json();
      setCurrentUser(userData);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
    return () => {
      setLoading(false);
      setHasError(false);
    };
  }, [currentUser, hasError]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className='flex flex-col items-center w-full md:w-96'
          onSubmit={(e) => authorizeLogin(e)}
        >
          <Logo className='mb-4' size='large' />
          <p className='text-sm font-medium text-gray-900 text-center mb-4'>
            Don't have an account yet?{' '}
            <span className='text-blue-700'>Sign up here.</span>
          </p>
          {/* Error Message */}
          <p
            className={`${
              !hasError && 'hidden'
            } text-sm text-red-600 dark:text-red-500 mb-4`}
          >
            Wrong email or password
          </p>
          {/* Email */}
          <div className='flex flex-col space-y-2 w-full'>
            <label
              className='text-sm font-medium text-gray-900'
              htmlFor='email'
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                hasError && setHasError(false);
              }}
              className={`bg-gray-50 border ${
                hasError
                  ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } text-sm rounded-lg  block w-full p-2.5`}
              type='text'
              id='email'
              required
            />
            {/* <p
            className={`${
              !hasError && 'hidden'
            } text-sm text-red-600 dark:text-red-500`}
          >
            Invalid email
          </p> */}
          </div>
          {/* Password */}
          <div className='flex flex-col space-y-2 mt-4 w-full'>
            <label
              className='text-sm font-medium text-gray-900'
              htmlFor='password'
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                hasError && setHasError(false);
              }}
              className={`bg-gray-50 border ${
                hasError
                  ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } text-sm rounded-lg  block w-full p-2.5`}
              type='password'
              id='password'
              required
            />
            {/* <p
            className={`${
              !hasError && 'hidden'
            } text-sm text-red-600 dark:text-red-500`}
          >
            Invalid email
          </p> */}
          </div>
          <Button className='mt-8 w-full' type='submit' size='large'>
            Log in
          </Button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
