import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

function Landing() {
  return (
    <>
      <div
        className={`h-screen flex flex-col bg-hero-image bg-no-repeat bg-cover dark`}
      >
        <Navbar type='landing-page' page='landing-page' />
        <Hero />
      </div>
      <Footer page='landing-page' />
    </>
  );
}

export default Landing;
