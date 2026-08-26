import "./globals.css";

export const metadata = {
  title: "Priyanka Maskar — Product",
  description:
    "Product leader building the retrieval and agentic-intelligence layer for PayPal World.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
