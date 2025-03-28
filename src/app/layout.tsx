import type { Metadata } from 'next';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import './globals.css';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});


export const metadata: Metadata = {
  title: 'Shadow Trading',
  description: 'Quotation to Invoice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Using RootLayout");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/new.png" type="image/icon type"></link>
      </head>
      <body className={` bg-[#fff] m-0 p-0 ${montserrat.variable} font-sans`}>
        <PrimeReactProvider>
          <main className="h-screen bg-[#fff] overflow-auto no-scrollbar">{children}</main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
