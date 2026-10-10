
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Mete Banyo & Seramik - Kalebodur, Duşakabin, Dolap ve Bataryalar",
  description: "Özel safir lacivert banyo dolapları, mermer desen kalebodur seramikler, duşakabin ve armatür sistemleri.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

