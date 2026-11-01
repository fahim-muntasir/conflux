import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Conflux",
    template: "%s | Conflux",
  },
  description: "AI powered text to speech voice cloning platform",
};

const clerkVariables = {
  colorBackground: "#18181b",
  colorInputBackground: "#09090b",
  colorInputText: "#fafafa",
  colorText: "#fafafa",
  colorTextSecondary: "#a1a1aa",
  colorPrimary: "#8b5cf6",
  colorTextOnPrimaryBackground: "#ffffff",
  colorNeutral: "#fafafa",
  colorDanger: "#f87171",
  borderRadius: "0.5rem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: clerkVariables }}>
      <TRPCReactProvider>
        <html lang="en" className="dark">
          <body
            className={`${inter.variable} ${geistMono.variable} antialiased`}
          >
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
            <Toaster theme="dark" />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}