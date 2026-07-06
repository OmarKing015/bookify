import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import "./globals.css";
import Navabr from "@/components/Navabr";

const IbmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ['latin'],
  weight: ["400", '500', '600', '700'],
  display: "swap"
})
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ['latin'],
  display: "swap"
})
export const metadata: Metadata = {
  title: "Bookify",
  description: "Transform your books into interactive AI conversations, Upload PDFs , and chat with your books using your Voice. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${IbmPlexSerif.variable} ${monaSans.variable} relative font-sans  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col   ">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <Navabr />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
