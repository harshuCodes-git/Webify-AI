import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "./Provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";



export const metadata = {
  title: "bolt.new",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <Provider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics/>
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
