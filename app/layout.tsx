import type { Metadata } from "next";
import { mono, serif } from "@/app/fonts";
import "../globals.css";
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
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css"
                    integrity="sha384-NFTC4wvyQKLwuJ8Ez9AvPNBv8zcC2XaQzXSMvtORKw28BdJbB2QE8Ka+OyrIHcQJ"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={`mx-auto max-w-4xl py-12 px-12 ${serif.className} antialiased`}>
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
