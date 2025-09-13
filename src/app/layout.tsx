import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Sidebar from "@/components/sidebar/Sidebar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: 'Trend Map',
    description: '글로벌 트렌드를 시각화하여 한눈에 파악하는 서비스',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <head>
            <link
                rel="preload"
                href="https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/DaeguCatholicUniversity.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>
            <SidebarProvider>
                <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Sidebar />
                    <main className="flex-1 md:ml-64 transition-all duration-300 ease-in-out">
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
