import { getPosts } from '@/backend/get-posts';
import Nav from '@/components/Nav';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
  const locale = cookies().get("locale") || "en-US";

  const posts = await getPosts({
    source: "test",
    locale: locale as string,
  });

  return (
    <div>
      <Nav locale={locale as string} />
      <main>
        <div className="container mx-auto px-8">
        </div>
        <div className="container mx-auto grid md:grid-cols-2 px-8">
          <h1 className='font-bold text-4xl mb-8'>blog</h1>
          <div>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className='block mb-20 relative'>
                <img src={`/.netlify/images?url=/images/${post.slug}.jpg`} alt={post.title} className='mb-4 rounded-xl shadow-xl' />
                <h2 className='absolute bottom-0 px-8 py-16 bg-gradient-to-t from-gray-50 via-gray-50 text-2xl w-full'>{post.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}