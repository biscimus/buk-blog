import type { Metadata } from "next";
import { serif } from "@/app/fonts";
import "../globals.css";
import Link from "next/link";
import Logo from "./components/Logo";
import BackToTop from "./components/BackToTop";

export const metadata: Metadata = {
    title: "BuK Blog",
    description: "A collection of my miniscule attempts to salvage RWTH students from depression & exmatriculation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.css"
                    integrity="sha384-NFTC4wvyQKLwuJ8Ez9AvPNBv8zcC2XaQzXSMvtORKw28BdJbB2QE8Ka+OyrIHcQJ"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={`mx-auto max-w-4xl py-12 px-12 ${serif.className} antialiased mb-32`}>
                <header className="flex justify-between mb-16 items-center">
                    <Logo />
                    <Link href="https://geonho.com">Geonho Yun</Link>
                </header>
                {children}
                <BackToTop />
            </body>
        </html>
    );
}




