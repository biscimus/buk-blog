import { title } from "@/app/fonts";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    try {
        const { default: Markdown, metadata } = await import(`@/markdown/${slug}/index.mdx`);
        return (
            <main>
                <h1 className={`${title.className} text-5xl text-orange-400 mt-32 mb-24`}>
                    {metadata.title}
                </h1>
                <Markdown />
            </main>
        );
    } catch {
        notFound();
    }
}
