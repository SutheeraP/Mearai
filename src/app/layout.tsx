import "~/styles/globals.css";
import { Inter } from 'next/font/google'
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Mearai",
  description: "T3-Learning project by cloning twitter app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
      <TRPCReactProvider>
        <html lang="en" className={`${inter.className} bg-gray-800 text-white text-opacity-90 `}>
          <body>
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
