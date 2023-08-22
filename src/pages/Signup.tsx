import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

function Signup() {
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Navbar type='landing-page' page='login' />
        <main className='container h-full flex justify-center self-center mt-20 px-4'>
          <SignupForm />
        </main>
      </div>
      <Footer page='login' />
    </>
  );
}

export default Signup;
