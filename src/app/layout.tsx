import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const mockUser = {
    username: "leonardo",
  }

  return (
    <html lang="en">
      <body className={"bg-gray-50 min-h-screen flex flex-col"}>
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <Link href={"/"} className="text-xl font-bold text-blue-600">
            SkillSwap
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-400 hover:text-blue-500">Home</Link>
            <Link href="/explore" className="text-gray-400 hover:text-blue-500">Explore</Link>
            <Link href={`/profile/${mockUser.username}`} className="text-gray-400 hover:text-blue-500">Profile</Link>
            <Link href="/onboarding" className="text-gray-400 hover:text-blue-500">Onboarding</Link>
          </div>
        </nav>
        <main className="flex-1 p-6">{children}</main>
        <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
          © {new Date().getFullYear()} SkillSwap
        </footer>
      </body>
    </html>
  );
}
