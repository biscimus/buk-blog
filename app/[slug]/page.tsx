import { korean } from "@/app/fonts";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    try {
        const { default: Markdown, metadata } = await import(`@/markdown/${slug}/index.mdx`);
        return (
            <main>
                <h1 className={`${korean.className} font-extrabold text-5xl text-orange-400 mb-4`}>
                    {metadata.title}
                </h1>
                <p className={`${korean.className} text-base text-slate-400 mb-16`}>
                    {metadata.date}
                </p>
                <Markdown />
            </main>
        );
    } catch (e) {
        notFound();
    }
}
