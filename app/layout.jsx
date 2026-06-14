import './styles/globals.css';

export const metadata = {
  title: 'Testamento Visual - Cómics Bíblicos Digitales',
  description: 'Explora la Biblia completa (Génesis a Apocalipsis) a través de cómics digitales inmersivos para adolescentes',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
