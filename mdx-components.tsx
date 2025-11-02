import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { mono } from "@/app/fonts";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h2: ({ children }) => (
            <h2 className="text-3xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => <h3 className="text-2xl mt-16">{children}</h3>,
        // h6 for definitions
        h6: ({ children }) => (
            <h6 className="bg-[#2e3440] rounded-md p-6 my-4">
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
            <blockquote
                className={`italic border-l-4 border-l-orange-400 px-6 py-0 my-6 *:my-2`}>
                {children}
            </blockquote>
        ),
        pre: ({ children }) => (
            <pre
                className={`${mono.className} bg-[#2e3440] rounded-md overflow-scroll`}>
                <div className="bg-gray-800 px-4 py-2 text-sm text-[#9198a1] sticky left-0 w-full">TypeScript</div>
                <div className="p-4">{children}</div>
            </pre>
        ),
        p: ({ children }) => <p className="my-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc [&>li]:py-2"> {children}</ul >,
        ol: ({ children }) => <ol className="list-decimal m-4">{children}</ol>,
        a: ({ href, children }) => <a href={href} target="_blank" className="underline decoration-dashed decoration-[#f6ad55]">{children}</a>,
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        ...components,
    };
}
