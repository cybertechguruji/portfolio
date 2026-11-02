import { getAllContent } from "@/lib/markdown";
import { ContentCard } from "@/components/card";

export const metadata = {
  title: "Blogs | Data Analyst Portfolio",
  description: "Technical articles, analyses, and data tutorials.",
};

export default function BlogsPage() {
  const blogs = getAllContent("blogs");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
          Articles & Insights
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-m3-on-surface">
          Blogs & Tutorials
        </h1>
        <p className="mt-2 text-base text-m3-on-surface-variant max-w-2xl">
          Thoughts on data analytics, SQL optimization, Python workflows, and business intelligence.
        </p>
      </div>

      {blogs.length === 0 ? (
        <p className="text-m3-on-surface-variant">No blog posts found yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          {blogs.map((blog) => (
            <ContentCard
              key={blog.slug}
              title={blog.title}
              href={`/blogs/${blog.slug}`}
              imageSrc={blog.thumbnail}
              imageAlt={blog.title}
              category={blog.category}
              date={blog.date}
              description={blog.description}
            />
          ))}
        </div>
      )}
    </main>
  );
}
