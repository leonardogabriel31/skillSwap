import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-gray-50 min-h-screen flex flex-col"}>
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
          © {new Date().getFullYear()} SkillSwap
        </footer>
      </body>
    </html>
  );
}
