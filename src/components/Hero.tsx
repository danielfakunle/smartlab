import Button from './Button';

function Hero() {
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
        <Button size='large' style='alternative'>
          Explore Demo Account
        </Button>
        <Button size='large' style='default'>
          Log in
        </Button>
      </div>
    </main>
  );
}

export default Hero;
