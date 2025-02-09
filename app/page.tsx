import { readdir } from "fs/promises";
import Link from "next/link";

type Metadata = {
    title: string;
    date: string;
    description: string;
    link: string;
    order: number;
};

async function getPosts() {
    // Iterate the markdown directory and extraact all metadata from the files
    const dirs = await readdir("./markdown/");
    // Get the metadata from each file and add the link property as the dir name
    const metadata: Metadata[] = await Promise.all(
        dirs.map(async (dir) => {
            const { metadata } = await import(`@/markdown/${dir}/index.mdx`);
            return Object.assign({ link: dir }, metadata);
        })
    );

    // sort the metadata by date
    return metadata.sort((a, b) => (a.order > b.order ? 1 : -1));
}

function Post({ post }: { post: Metadata }) {
    return (
        <Link href={post.link}>
            <article className="flex flex-col gap-2 border-2 rounded-md p-6">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p>{post.description}</p>
            </article>
        </Link>
    );
}

export default async function Page() {
    const posts = await getPosts();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-16 gap-12">
            <main className="flex flex-col gap-10 row-start-2">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
