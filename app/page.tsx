import { readdir } from "fs/promises";
import Link from "next/link";

type Metadata = {
    title: string;
    date: string;
    description: string;
    link: string;
};

async function getPosts() {
    // Iterate the public directory and extraact all metadata from the files
    const dirs = await readdir("./public/");
    console.log("dirs", dirs);
    // Get the metadata from each file and add the link property as the dir name
    const metadata: Metadata[] = await Promise.all(
        dirs.map(async (dir) => {
            const { metadata } = await import(`@/public/${dir}/index.mdx`);
            return Object.assign({ link: dir }, metadata);
        })
    );

    // sort the metadata by date
    return metadata.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function Post({ post }: { post: Metadata }) {
    return (
        <Link href={post.link}>
            <article className="flex flex-col gap-2 border-2 p-6">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.date}</p>
                <p>{post.description}</p>
            </article>
        </Link>
    );
}

export default async function Page() {
    const posts = await getPosts();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 gap-16">
            <main className="flex flex-col gap-8 row-start-2">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
