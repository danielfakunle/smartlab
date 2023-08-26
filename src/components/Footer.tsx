import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { deleteUser } from '../utils/authUser';

type FooterProps = {
  page: string;
  type?: 'landing-page' | 'app';
};

function Footer({ page, type = 'landing-page' }: FooterProps) {
  const { setCurrentUser } = useContext(UserContext) as UserContextType;
  return (
    <footer
      className={`flex justify-center ${
        page === 'landing-page' ? 'bg-blue-950' : 'bg-gray-100'
      }`}
    >
      <div className='container flex justify-between items-center py-10 px-4 md:px-6'>
        <p
          className={`${
            page === 'landing-page' ? 'text-white' : 'text-gray-900'
          } w-3/5`}
        >
          © 2023 SmartLab, Inc. All rights reserved.
          <br />{' '}
          <a href='https://www.flaticon.com/free-icons/brain'>
            Brain icons created by heisenberg_jr - Flaticon
          </a>
        </p>
        <ul className='flex flex-col space-y-4 md:flex-row items-center md:space-y-0 md:space-x-4 h-fit'>
          <Link
            to='/login'
            className={`${
              type === 'app' && 'hidden'
            } text-sm font-medium hover:text-blue-700 cursor-pointer ${
              page === 'landing-page' ? 'text-white' : 'text-gray-900 '
            }`}
          >
            Log in
          </Link>
          <Link
            to='/signup'
            className={`${
              type === 'app' && 'hidden'
            } text-sm font-medium hover:text-blue-700 cursor-pointer ${
              page === 'landing-page' ? 'text-white' : 'text-gray-900 '
            }`}
          >
            Sign up
          </Link>
          <Link
            to='/'
            onClick={() => {
              setCurrentUser(null);
              deleteUser();
            }}
            className={`${
              type !== 'app' && 'hidden'
            } text-sm font-medium hover:text-blue-700 cursor-pointer ${
              page === 'landing-page' ? 'text-white' : 'text-gray-900 '
            }`}
          >
            Sign out
          </Link>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
