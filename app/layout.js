import "./globals.css";

export const metadata = {
  title: "Priyanka Maskar — Product",
  description:
    "AI-native product manager shipping agentic systems into production payments infrastructure.",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
