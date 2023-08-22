import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

function Login() {
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Navbar type='landing-page' page='login' />
        <main className='container h-full flex justify-center self-center mt-20 px-4'>
          <LoginForm />
        </main>
      </div>
      <Footer page='login' />
    </>
  );
}

export default Login;
