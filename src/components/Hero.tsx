import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../context/LoadingContext';
import UserContext from '../context/UserContext';
import Button from './Button';

function Hero() {
  const [hasError, setHasError] = useState(false);
  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;
  const { loading, setLoading } = useContext(
    LoadingContext
  ) as LoadingContextType;
  const navigate = useNavigate();

  const loginWithDemo = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'johndoe@gmail.com',
        password: 'apples',
      }),
    });
    if (response.status === 400) {
      setHasError(true);
      alert('An error has occurred');
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
    <main className='h-full flex flex-col justify-center items-center space-y-8 md:space-y-12 px-4 md:px-6'>
      <div className='flex flex-col justify-center space-y-4'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center'>
          Discover the Magic of AI
        </h1>
        <h2 className='text-gray-400 text-xl text-center'>
          Experience the future with your personal AI sandbox.
        </h2>
      </div>
      <div className='flex w-full flex-col space-y-4 md:w-fit md:flex-row md:space-y-0 md:space-x-4'>
        <Button
          size='large'
          style='alternative'
          className='flex items-center'
          onClick={loginWithDemo}
          disabled={loading}
        >
          {loading && (
            <svg
              aria-hidden='true'
              className='w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          )}
          Explore Demo Account
        </Button>
        <Button size='large' style='default' onClick={() => navigate('/login')}>
          Log in
        </Button>
      </div>
    </main>
  );
}

export default Hero;
