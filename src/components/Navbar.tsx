import Button from './Button';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

type NavbarProps = {
  type: 'landing-page' | 'app';
  page: string;
};

function Navbar({ type, page }: NavbarProps) {
  return (
    <nav className={`${type} flex justify-center relative`}>
      <div className='container flex justify-between items-center py-6 px-4 md:px-6'>
        <Logo size='base' page={page} />
        {/* Mobile Menu */}
        <MobileMenu page={page} />
        {/* Nav Links */}
        <ul className='hidden md:flex items-center space-x-8'>
          <li className='text-gray-900 text-sm font-medium hover:text-blue-700 cursor-pointer dark:text-white dark:hover:text-blue-700'>
            Log in
          </li>
          <Button size='base' type='button' style='default'>
            Sign up
          </Button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
