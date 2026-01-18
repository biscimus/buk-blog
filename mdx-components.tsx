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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-neutral-300">{children}</h2>
        ),
        h3: ({ children }) => <h3 className="text-2xl mt-16 text-gray-700 dark:text-neutral-300">{children}</h3>,
        // h6 for definitions
        h6: ({ children }) => (
            <div className="my-4 rounded-md border-2 border-[#ebe1d2] dark:border-orange-300/40 overflow-hidden">
                <div className="bg-[#A69B8A]/30 dark:bg-transparent px-4 py-2 text-gray-800 dark:text-orange-300 sticky left-0 border-b border-[#ddd3c4] dark:border-orange-300/40 font-bold">Definition</div>
                <h6 className="px-6 py-6">
                    {children}
                </h6>
            </div>
            
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
                className={`${mono.className} rounded-md overflow-hidden dark:border-2 border-transparent dark:border-orange-300/40 shadow-lg z-50`}>
                <div className="bg-[#A69B8A]/30 dark:bg-transparent px-4 py-2 text-sm text-gray-700 dark:text-orange-300 sticky left-0 w-full border-b border-[#ddd3c4] dark:border-orange-300/40">TypeScript</div>
                <div className="p-4 overflow-x-auto overflow-y-visible">{children}</div>
            </pre>
        ),
        p: ({ children }) => <p className="my-4 text-gray-700 dark:text-neutral-300">{children}</p>,
        ul: ({ children }) => <ul className="list-disc [&>li]:py-2 text-gray-700 dark:text-neutral-300"> {children}</ul >,
        ol: ({ children }) => <ol className="list-decimal m-4 text-gray-700 dark:text-neutral-300">{children}</ol>,
        a: ({ href, children }) => <a href={href} target="_blank" className="underline decoration-dashed decoration-[#A69B8A] dark:decoration-[#f6ad55] text-[#A69B8A] dark:text-[#f6ad55] hover:text-[#847A6D] dark:hover:text-orange-300">{children}</a>,
        strong: ({ children }) => <strong className="font-bold text-gray-800 dark:text-neutral-300">{children}</strong>,
        ...components,
    };
}
