export const metadata = {
  title: 'TesteamentoVisual - Cómics Bíblicos Digitales',
  description: 'Cómics bíblicos digitales para adolescentes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
