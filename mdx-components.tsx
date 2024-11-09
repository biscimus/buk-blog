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
            <h2 style={{ fontSize: "40px", fontWeight: "bolder" }}>{children}</h2>
        ),
        h3: ({ children }) => <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{children}</h3>,
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                {...(props as ImageProps)}
            />
        ),
        blockquote: ({ children }) => (
            <blockquote
                style={{
                    fontStyle: "italic",
                    borderLeft: "4px solid #4c566a",
                    paddingLeft: "1rem",
                    margin: "1rem 0",
                }}>
                {children}
            </blockquote>
        ),
        pre: ({ children }) => (
            <pre
                className={`${mono.className}`}
                style={{
                    backgroundColor: "#2e3440",
                    borderRadius: "0.5rem",
                    padding: "1.5rem 1rem",
                    margin: "1rem 0",
                    overflow: "scroll",
                }}>
                {children}
            </pre>
        ),
        ...components,
    };
}
