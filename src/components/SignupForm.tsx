import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from '../context/LoadingContext';
import UserContext from '../context/UserContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Loading from './Loading';
import Logo from './Logo';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;
  const { loading, setLoading } = useContext(
    LoadingContext
  ) as LoadingContextType;
  const navigate = useNavigate();

  const authorizeSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}signup`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (response.status === 400) {
      alert('Error signing up');
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

  useEffect(() => {
    let emailformat =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.length > 0 && !email.match(emailformat)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password.length > 0 && password.length < 10) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (password.length > 0 && confirmPassword != password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }, [email, password, confirmPassword]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className='flex flex-col items-center w-full md:w-96'
          onSubmit={(e) => authorizeSignup(e)}
        >
          <Logo className='mb-4' size='large' />
          <p className='text-sm font-medium text-gray-900 text-center mb-4'>
            Already have an account?{' '}
            <span className='text-blue-700'>Log in here.</span>
          </p>
          {/* Name */}
          <div className='flex flex-col space-y-2 w-full'>
            <label className='text-sm font-medium text-gray-900' htmlFor='name'>
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className={`bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg  block w-full p-2.5`}
              type='text'
              id='name'
              required
            />
          </div>
          {/* Email */}
          <div className='flex flex-col space-y-2 mt-4 w-full'>
            <label
              className='text-sm font-medium text-gray-900'
              htmlFor='email'
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-gray-50 border ${
                emailError
                  ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } text-sm rounded-lg  block w-full p-2.5`}
              type='text'
              id='email'
              required
            />
            <p
              className={`${
                !emailError && 'hidden'
              } text-sm text-red-600 dark:text-red-500`}
            >
              Invalid email
            </p>
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
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-gray-50 border ${
                passwordError
                  ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } text-sm rounded-lg  block w-full p-2.5`}
              type='password'
              id='password'
              required
            />
            <p
              className={`${
                !passwordError && 'hidden'
              } text-sm text-red-600 dark:text-red-500`}
            >
              Password has to be at least 10 characters
            </p>
          </div>
          {/* Confirm Password */}
          <div className='flex flex-col space-y-2 mt-4 w-full'>
            <label
              className='text-sm font-medium text-gray-900'
              htmlFor='confirmPassword'
            >
              Confirm password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`bg-gray-50 border ${
                confirmPasswordError
                  ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              } text-sm rounded-lg  block w-full p-2.5`}
              type='password'
              id='confirmPassword'
              required
            />
            <p
              className={`${
                !confirmPasswordError && 'hidden'
              } text-sm text-red-600 dark:text-red-500`}
            >
              Passwords do not match
            </p>
          </div>
          <Checkbox
            className='mt-4'
            id='agree'
            label='By signing up, you are creating a SmartLab account, and you agree to have fun.'
          />
          <Button className='mt-8 w-full' type='submit' size='large'>
            Sign up
          </Button>
        </form>
      )}
    </>
  );
}

export default SignupForm;
