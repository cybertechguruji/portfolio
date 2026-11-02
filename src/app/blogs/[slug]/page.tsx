import { Suspense } from "react";
import { getContentBySlug, getAllContent } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = getAllContent("blogs");
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getContentBySlug("blogs", slug);
  if (!post) return { title: "Blog Not Found" };

  return {
    title: `${post.title} | Data Analyst Portfolio`,
    description: post.description,
  };
}

function BlogPostSkeleton() {
  return (
    <article className="w-full max-w-full bg-m3-surface-container-low border border-m3-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-m3-1 animate-pulse overflow-hidden">
      <div className="flex gap-3 sm:gap-4 mb-4">
        <div className="h-6 w-24 bg-m3-surface-container-highest rounded-full" />
        <div className="h-6 w-20 bg-m3-surface-container-highest rounded-full" />
      </div>
      <div className="h-8 sm:h-10 w-3/4 bg-m3-surface-container-highest rounded-xl mb-6" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-m3-surface-container-highest rounded" />
        <div className="h-4 w-5/6 bg-m3-surface-container-highest rounded" />
        <div className="h-4 w-2/3 bg-m3-surface-container-highest rounded" />
      </div>
    </article>
  );
}

async function BlogPostContent({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getContentBySlug("blogs", slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full max-w-full bg-m3-surface-container-low border border-m3-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-m3-1 overflow-hidden break-words">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-m3-on-surface-variant mb-4">
        {post.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-m3-secondary-container text-m3-on-secondary-container font-semibold">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        )}
        {post.date && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-m3-on-surface mb-6 break-words">
        {post.title}
      </h1>

      <div
        className="prose dark:prose-invert max-w-none w-full
                   [&>h1]:text-xl sm:[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-m3-on-surface [&>h1]:break-words
                   [&>h2]:text-lg sm:[&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:text-m3-on-surface [&>h2]:border-b [&>h2]:border-m3-outline-variant/30 [&>h2]:pb-2 [&>h2]:break-words
                   [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-m3-on-surface [&>h3]:break-words
                   [&>h4]:text-sm sm:[&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2 [&>h4]:text-m3-on-surface [&>h4]:break-words
                   [&>p]:text-m3-on-surface-variant [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:break-words
                   [&>ul]:list-disc [&>ul]:pl-5 sm:[&>ul]:pl-6 [&>ul]:space-y-1.5 [&>ul]:mb-4 [&>ul]:text-m3-on-surface-variant [&>ul]:break-words
                   [&>ol]:list-decimal [&>ol]:pl-5 sm:[&>ol]:pl-6 [&>ol]:space-y-1.5 [&>ol]:mb-4 [&>ol]:text-m3-on-surface-variant [&>ol]:break-words
                   [&_li]:marker:text-m3-primary
                   [&>blockquote]:border-l-4 [&>blockquote]:border-m3-primary [&>blockquote]:bg-m3-surface-container [&>blockquote]:pl-4 [&>blockquote]:py-2.5 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:my-4 [&>blockquote]:text-m3-on-surface-variant [&>blockquote]:break-words
                   [&_.table-wrapper]:my-6 [&_.table-wrapper]:w-full [&_.table-wrapper]:max-w-full [&_.table-wrapper]:overflow-x-auto [&_.table-wrapper]:rounded-2xl [&_.table-wrapper]:border [&_.table-wrapper]:border-m3-outline-variant/30 [&_.table-wrapper]:bg-m3-surface-container-lowest [&_.table-wrapper]:shadow-sm
                   [&_table]:w-full [&_table]:min-w-full [&_table]:table-auto [&_table]:border-collapse
                   [&_thead]:bg-m3-surface-container [&_thead]:w-full
                   [&_th]:text-m3-on-surface [&_th]:font-semibold [&_th]:px-4 [&_th]:py-3 sm:[&_th]:px-5 sm:[&_th]:py-3.5 [&_th]:border-b [&_th]:border-m3-outline-variant/30 [&_th]:text-xs sm:[&_th]:text-sm
                   [&_tbody_tr]:transition-colors hover:[&_tbody_tr]:bg-m3-surface-container-low/50
                   [&_td]:px-4 [&_td]:py-3 sm:[&_td]:px-5 sm:[&_td]:py-3.5 [&_td]:border-b [&_td]:border-m3-outline-variant/20 [&_td]:text-m3-on-surface-variant [&_td]:text-xs sm:[&_td]:text-sm
                   [&_tbody_tr:last-child>td]:border-b-0
                   [&_a]:text-m3-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80 [&_a]:break-words
                   [&_img]:rounded-xl sm:[&_img]:rounded-2xl [&_img]:border [&_img]:border-m3-outline-variant/30 [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:object-contain [&_img]:shadow-m3-1 [&_img]:mx-auto
                   [&>hr]:my-6 sm:[&>hr]:my-8 [&>hr]:border-m3-outline-variant/30
                   [&>pre]:w-full [&>pre]:max-w-full [&>pre]:overflow-x-auto [&>pre]:bg-m3-surface-lowest [&>pre]:border [&>pre]:border-m3-outline-variant/40 [&>pre]:p-3 sm:[&>pre]:p-4 [&>pre]:rounded-xl sm:[&>pre]:rounded-2xl [&>pre]:mb-6
                   [&>pre>code]:text-xs [&>pre>code]:font-mono
                   [&>:not(pre)>code]:bg-m3-surface-container-highest [&>:not(pre)>code]:px-1.5 [&>:not(pre)>code]:py-0.5 [&>:not(pre)>code]:rounded-md [&>:not(pre)>code]:text-xs [&>:not(pre)>code]:font-mono [&>:not(pre)>code]:break-all"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
      />
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostProps) {
  return (
    <main className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm font-medium text-m3-primary hover:underline mb-6 sm:mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all blogs
      </Link>

      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostContent params={params} />
      </Suspense>
    </main>
  );
}
