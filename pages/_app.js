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
        <main className="pb-24 md:pb-12 lg:pb-20 xl:pb-16 mt-20 md:mt-20 lg:mt-20 xl:mt-24">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;