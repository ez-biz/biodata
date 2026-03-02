import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | BiodataCraft Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  // Convert markdown-style bold to HTML
  const htmlContent = post.content
    .split("\n\n")
    .map((para) => para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"))
    .map((para) => `<p>${para}</p>`)
    .join("");

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="bg-paisley">
        {/* Header */}
        <div className="container px-4 pt-12 pb-8 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-maroon-700 hover:underline mb-8"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700 capitalize mb-4">
            {post.category}
          </span>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-maroon-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-maroon-500">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-maroon-300" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="h-1 w-1 rounded-full bg-maroon-300" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Body */}
        <div className="container px-4 pb-16 max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-maroon-900 prose-p:text-maroon-800/80 prose-p:leading-relaxed prose-strong:text-maroon-900 prose-a:text-maroon-700 prose-a:underline"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="bg-maroon-900 py-12">
        <div className="container px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-gold-200 mb-3">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Use our beautiful templates to build a professional marriage biodata
            in minutes. Free to get started.
          </p>
          <Link
            href="/create"
            className="inline-block rounded-full bg-gold-500 px-8 py-3 text-sm font-semibold text-maroon-950 hover:bg-gold-400 transition-colors"
          >
            Create My Biodata
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container px-4 py-16 max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-maroon-900 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group"
              >
                <article className="h-full rounded-2xl border border-maroon-100/50 bg-white p-6 hover:shadow-lg transition-shadow duration-300">
                  <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700 capitalize mb-3">
                    {related.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-maroon-900 mb-2 group-hover:text-maroon-700 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-maroon-400">{related.readTime}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
