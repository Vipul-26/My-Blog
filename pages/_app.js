import '../styles/globals.css';
import Footer from '../components/Footer/index';
import NextNProgress from 'nextjs-progressbar';
import Header from './../components/Header/index';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <div className="container mx-auto">
        <NextNProgress color="#53BD95" />
        <Header />
        <main className="pb-36 sm:pb-32">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;