import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Southern Automotive Group | Used Vehicles in Clayton, GA",
  description:
    "Southern Automotive Group in Clayton, GA — vehicles worth owning, people worth trusting. Browse inventory, financing, and trade-ins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg min-h-screen">
        {/* Reveal animations hide their content until JS shows it, so without
            JS every section has to be forced back to visible. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal],[data-reveal-stagger]>*{opacity:1!important}",
            }}
          />
        </noscript>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
