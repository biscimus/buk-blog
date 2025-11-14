import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { mono } from "@/app/fonts";
import AnimatedBlockquote from "@/app/components/AnimatedBlockquote";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{children}</h2>
        ),
        h3: ({ children }) => <h3 className="text-2xl mt-16 text-gray-700 dark:text-white">{children}</h3>,
        // h6 for definitions
        h6: ({ children }) => (
            <h6 className="bg-[#f5f1eb] dark:bg-[#2e3440] rounded-md p-6 my-4 border border-[#ebe1d2] dark:border-none">
                {children}
            </h6>
        ),
        img: (props) => (
            <Image
                sizes="100vw"
                className="w-full h-auto"
                {...(props as ImageProps)}
            />
        ),
        blockquote: ({ children }) => (
            <AnimatedBlockquote>
                {children}
            </AnimatedBlockquote>
        ),
        pre: ({ children }) => (
            <pre
                className={`${mono.className} bg-[#f5f1eb] dark:bg-[#2e3440] rounded-md overflow-scroll border border-[#ebe1d2] dark:border-none`}>
                <div className="bg-[#ebe1d2] dark:bg-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-[#9198a1] sticky left-0 w-full border-b border-[#ddd3c4] dark:border-gray-600 font-medium">TypeScript</div>
                <div className="p-4">{children}</div>
            </pre>
        ),
        p: ({ children }) => <p className="my-4 text-gray-700 dark:text-white">{children}</p>,
        ul: ({ children }) => <ul className="list-disc [&>li]:py-2 text-gray-700 dark:text-white"> {children}</ul >,
        ol: ({ children }) => <ol className="list-decimal m-4 text-gray-700 dark:text-white">{children}</ol>,
        a: ({ href, children }) => <a href={href} target="_blank" className="underline decoration-dashed decoration-orange-500 dark:decoration-[#f6ad55] text-orange-600 dark:text-[#f6ad55] hover:text-orange-700 dark:hover:text-orange-300">{children}</a>,
        strong: ({ children }) => <strong className="font-bold text-gray-800 dark:text-white">{children}</strong>,
        ...components,
    };
}
