import type { Metadata } from "next";
import { serif } from "@/app/fonts";
import "../globals.css";
import Link from "next/link";
import Logo from "./components/Logo";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import ThemeWrapper from "./components/ThemeWrapper";

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
            <body className={`${serif.className} antialiased bg-[#f0ead6d3] dark:bg-black transition-colors duration-300`}>
                <ThemeProvider>
                    <ThemeWrapper>
                        <ThemeToggle />
                        <header className="flex justify-between mb-16 items-center">
                            <Logo />
                            <Link href="https://geonho.com">
                                Geonho Yun
                            </Link>
                        </header>
                        {children}
                        <BackToTop />
                        <footer className="mt-40 flex flex-col gap-2 text-right text-sm text-gray-600 dark:text-gray-400">
                            <div>© {new Date().getFullYear()} BuK Blog. All rights reserved.</div>
                            <div>The primary purpose of this blog is to help students survive at RWTH Aachen University.</div>
                            <div>Any suggestions, questions or feedback is welcome! Feel free to open a <Link href="https://github.com/biscimus/buk-blog/issues/new">Github issue</Link>.</div>
                        </footer>
                    </ThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}




