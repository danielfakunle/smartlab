import { useState } from 'react';
import Button from './Button';
import Logo from './Logo';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const authorizeLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
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
        <label className='text-sm font-medium text-gray-900' htmlFor='email'>
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
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
        <label className='text-sm font-medium text-gray-900' htmlFor='password'>
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
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
  );
}

export default LoginForm;
