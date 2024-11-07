import createMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import rehypeStarryNight from "rehype-starry-night";
import remarkMath from "remark-math";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeStarryNight],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
