import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='h-screen flex'>
        {children}
      </body>
    </html>
  );
}
