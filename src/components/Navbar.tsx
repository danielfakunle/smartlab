import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import UserDropdown from './UserDropdown';

type NavbarProps = {
  type: 'landing-page' | 'app';
  page: string;
};

function Navbar({ type, page }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <nav
      className={`flex justify-center relative ${
        page !== 'landing-page' && 'border-b-2 border-gray-100'
      }`}
    >
      <div className='container flex justify-between items-center py-6 px-4 md:px-6'>
        <div className='flex items-center space-x-8'>
          <Logo
            size='base'
            page={page}
            onClick={() =>
              type === 'landing-page' ? navigate('/') : navigate('/home')
            }
          />

          <ul
            className={`${
              type === 'app' ? 'md:flex' : 'md:hidden'
            } hidden items-center space-x-8`}
          >
            <Link
              to='/home'
              className='text-gray-900 text-sm font-medium hover:text-blue-700 cursor-pointer dark:text-white dark:hover:text-blue-700'
            >
              Home
            </Link>
            <Link
              to='/under-construction'
              className='text-gray-900 text-sm font-medium hover:text-blue-700 cursor-pointer dark:text-white dark:hover:text-blue-700'
            >
              Leaderboard
            </Link>
          </ul>
        </div>
        <div className='flex items-center space-x-4 '>
          <div className='relative'>
            <UserDropdown type={type} />
          </div>
          {/* Mobile Menu */}
          <MobileMenu page={page} type={type} />
        </div>
        {/* Nav Links */}
        <ul
          className={`${
            type === 'app' ? 'md:hidden' : 'md:flex'
          } hidden items-center space-x-8`}
        >
          <Link
            to='/login'
            className='text-gray-900 text-sm font-medium hover:text-blue-700 cursor-pointer dark:text-white dark:hover:text-blue-700'
          >
            Log in
          </Link>
          <Button
            size='base'
            type='button'
            style='default'
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
