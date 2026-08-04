import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Southern Automotive Group | Used Vehicles in Clayton, GA",
  description:
    "Southern Automotive Group in Clayton, GA — vehicles worth owning, and people worth trusting. Browse inventory, financing, and trade-ins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
