import "../styles/globals.css";
import Navbar from "./components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="lg:w-[80%] lg:mx-auto">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
