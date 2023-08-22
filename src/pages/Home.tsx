import { faceDetectThumb, searchIcon } from '../assets';
import Footer from '../components/Footer';
import ModelCard from '../components/ModelCard';
import Navbar from '../components/Navbar';

function Home() {
  const modelInfo = [
    {
      title: 'Face Detection',
      text: 'Powered by Clarifai Generative AI, the fastest production-grade, deep learning AI platform.',
      image: faceDetectThumb,
    },
  ];

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar type='app' page='home' />
        <main className='container h-full flex flex-col justify-center self-center space-y-8 px-4 md:px-6 mt-8 mb-16'>
          <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:justify-between w-full h-fit lg:items-center'>
            <div className='flex flex-col space-y-2'>
              <h1 className='text-2xl leading-none md:text-3xl text-gray-900 font-bold'>
                Welcome back, John!
              </h1>
              <h2 className='text-base md:text-lg text-gray-500'>
                Click on any of the models below to get started.
              </h2>
            </div>
            <div className='relative lg:w-96'>
              <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg w-full py-3 px-10`}
                type='text'
                id='email'
              />
              <img
                className='inset-0 absolute left-4 top-[15px]'
                src={searchIcon}
                alt=''
              />
            </div>
          </div>
          <div className='grid md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            <ModelCard info={modelInfo[0]} page='/facedetect' />
          </div>
        </main>
      </div>
      <Footer page='home' type='app' />
    </>
  );
}

export default Home;
