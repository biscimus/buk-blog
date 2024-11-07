import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { mono } from "@/app/fonts";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 style={{ fontSize: "48px", fontWeight: "bolder", color: "orange" }}>{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 style={{ fontSize: "40px", fontWeight: "bolder" }}>{children}</h2>
        ),
        h3: ({ children }) => <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{children}</h3>,
        h6: ({ children }) => <h6 style={{ fontSize: "16px", color: "gray" }}>{children}</h6>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                {...(props as ImageProps)}
            />
        ),
        pre: ({ children }) => (
            <pre
                className={`${mono.className}`}
                style={{
                    backgroundColor: "#2e3440",
                    borderRadius: "0.5rem",
                    padding: "1.5rem 1rem",
                    margin: "1rem 0",
                }}>
                {children}
            </pre>
        ),
        ...components,
    };
}
