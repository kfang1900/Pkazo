import GlobalStyles from 'components/GlobalStyles';
import type { AppProps } from 'next/app';
import AuthProvider from 'utils/auth/AuthProvider';
import '/styles/algolia-satellite.css';
import ImageURLCacheProvider from '../utils/imageURLCache/ImageURLCacheProvider';
import CartProvider from '../utils/hooks/CartProvider';

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <GlobalStyles />
    <AuthProvider>
      <ImageURLCacheProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ImageURLCacheProvider>
    </AuthProvider>
  </div>
);

export default App;
