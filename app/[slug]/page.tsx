export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const { default: Markdown } = await import(`@/public/${slug}/index.mdx`);
    return <Markdown />;
}
