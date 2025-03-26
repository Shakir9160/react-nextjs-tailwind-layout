import { ThemeProvider } from '../context/theme-context';
import { TimerControlProvider } from '../context/timer-control-context'; // Moved here
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TimerControlProvider>
        <Component {...pageProps} />
      </TimerControlProvider>
    </ThemeProvider>
  );
}

export default MyApp;