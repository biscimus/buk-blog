import type { Metadata } from "next";
import { mono, serif, korean } from "@/app/fonts";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "BuK Blog",
    description: "A blog about the infamous BuK by Geonho Yun",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en, kr">
            <body
                className={`mx-auto max-w-4xl py-12 px-5 ${mono.className} ${serif.className} ${korean.className} antialiased`}>
                <header className="flex justify-between mb-16 items-baseline">
                    <Link href="/" className={`text-3xl font-bold ${mono.className}`}>
                        buk_blog
                    </Link>
                    <Link href="https://geonho.de">Geonho Yun</Link>
                </header>
                {children}
            </body>
        </html>
    );
}
