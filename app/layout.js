import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
const serif = Fraunces({ subsets: ['latin'], variable: '--serif' });
const sans = Inter({ subsets: ['latin'], variable: '--sans' });
export default function RootLayout({ children }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
