import "./globals.css";

export const metadata = {
  title: "Priyanka Maskar — Product",
  description:
    "Product leader building the retrieval and agentic-intelligence layer for PayPal World.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var t = localStorage.getItem('theme');
              if (t === 'dark' || t === 'light') {
                document.documentElement.setAttribute('data-theme', t);
              }
            } catch (e) {}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
