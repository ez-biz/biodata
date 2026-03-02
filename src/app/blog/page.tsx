"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog/posts";
import { JsonLd, blogCollectionJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <main className="min-h-screen">
      <JsonLd data={blogCollectionJsonLd(BLOG_POSTS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-paisley py-16 md:py-24">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-maroon-900 mb-4">
            BiodataCraft Blog
          </h1>
          <p className="text-lg text-maroon-700/70 max-w-2xl mx-auto">
            Expert tips, guides, and insights to help you create the perfect
            marriage biodata and navigate the matchmaking journey.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container px-4 pt-10 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat.value
                  ? "bg-maroon-800 text-gold-100"
                  : "bg-maroon-50 text-maroon-700 hover:bg-maroon-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container px-4 py-10 pb-20">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-maroon-700/60 py-12">
            No posts found in this category.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="h-full rounded-2xl border border-maroon-100/50 bg-white p-7 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700 capitalize">
                      {post.category}
                    </span>
                    <span className="text-xs text-maroon-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-maroon-900 mb-3 group-hover:text-maroon-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-maroon-700/60 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-maroon-400">
                    <span>{post.author}</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
