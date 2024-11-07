export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const { default: Markdown } = await import(`@/markdown/${slug}/index.mdx`);
    return (
        <main>
            <Markdown />
        </main>
    );
}
