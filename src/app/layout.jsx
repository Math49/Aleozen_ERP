import "@/style/global.css";

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <title>Aléozen - Outil de gestion</title>
      <body>
        {children}
      </body>
    </html>
  );
}
