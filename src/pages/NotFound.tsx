import { notFound } from '../assets';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function NotFound() {
  return (
    <>
      <div className={`min-h-screen flex flex-col`}>
        <Navbar type='landing-page' page='not-found' />
        <main className='container h-full flex flex-col justify-center self-center space-y-8 px-4 md:px-6 mt-8 mb-16 items-center'>
          <div className='flex flex-col space-y-8 items-center'>
            <div className='flex flex-col space-y-4'>
              <h1 className='text-blue-700 font-bold text-8xl md:text-9xl text-center leading-none'>
                404
              </h1>
              <h2 className='text-gray-900 font-bold text-2xl md:text-3xl'>
                Something's missing.
              </h2>
              <p className='text-gray-500 text-xl text-center leading-none'>
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.
              </p>
            </div>
            <Button type='button' style='default' size='large'>
              Go home
            </Button>
          </div>
          <img
            className='w-full sm:w-96 md:w-3/5'
            src={notFound}
            alt='constuction'
          />
        </main>
      </div>
      <Footer page='not-found' />
    </>
  );
}

export default NotFound;
