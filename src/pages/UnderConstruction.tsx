import { useNavigate } from 'react-router-dom';
import { notFound } from '../assets';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function UnderConstruction() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`min-h-screen flex flex-col`}>
        <Navbar type='app' page='under-construction' />
        <main className='container h-full flex flex-col justify-center self-center space-y-16 px-4 md:px-6 mt-16 mb-32 items-center'>
          <div className='flex flex-col space-y-8 items-center'>
            <div className='flex flex-col space-y-4'>
              <h1 className='text-gray-900 font-bold text-3xl md:text-4xl lg:text-5xl text-center leading-none'>
                Under Construction
              </h1>
              <p className='text-gray-500 text-xl text-center leading-none'>
                This page is still under construction.
              </p>
            </div>
            <Button
              type='button'
              style='default'
              size='large'
              onClick={() => navigate('/home')}
            >
              Go home
            </Button>
          </div>
          <img
            className='w-full sm:w-96 md:w-1/2'
            src={notFound}
            alt='constuction'
          />
        </main>
      </div>
      <Footer page='under-construction' type='app' />
    </>
  );
}

export default UnderConstruction;
