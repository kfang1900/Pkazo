import GlobalStyles from 'components/GlobalStyles';
import type { AppProps } from 'next/app';
import AuthProvider from 'utils/AuthProvider';
import '/styles/algolia-satellite.css';

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <GlobalStyles />
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </div>
);

export default App;
