import { readdir } from "fs/promises";
import Link from "next/link";

type Metadata = {
    title: string;
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
        <Link prefetch={true} href={post.link}>
            <article className="flex flex-col gap-4 
                border-2 border-[#d4c5af] dark:border-gray-700 
                rounded-md p-6 
                transition-all duration-300 
                hover:shadow-lg hover:shadow-orange-300/20 dark:hover:shadow-orange-500/20
                hover:scale-[1.02] 
                hover:border-orange-400/80 dark:hover:border-orange-400/60">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{post.order}. {post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
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
