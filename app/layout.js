import "./globals.css";

export const metadata = {
  title: "Săn rồng vàng, trúng ngàn ưu đãi",
  description: "Săn rồng vàng, trúng ngàn ưu đãi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
