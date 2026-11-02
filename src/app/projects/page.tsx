import { getAllContent } from "@/lib/markdown";
import { ContentCard } from "@/components/card";

export const metadata = {
  title: "Projects | Data Analyst Portfolio",
  description: "End-to-end data analytics projects, SQL pipelines, and BI dashboards.",
};

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-semibold tracking-wider uppercase text-m3-primary bg-m3-primary-container/40 px-3 py-1 rounded-full">
          Portfolio & Case Studies
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-m3-on-surface">
          Featured Data Projects
        </h1>
        <p className="mt-2 text-base text-m3-on-surface-variant max-w-2xl">
          Real-world data analyses solving business challenges with SQL, Python, machine learning, and interactive dashboards.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-m3-surface-container-low rounded-3xl border border-m3-outline-variant/30">
          <p className="text-m3-on-surface-variant">No projects found in content/projects yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          {projects.map((project) => (
            <ContentCard
              key={project.slug}
              title={project.title}
              href={`/projects/${project.slug}`}
              imageSrc={project.thumbnail}
              imageAlt={project.title}
              category={project.category}
              date={project.date}
              description={project.description}
            />
          ))}
        </div>
      )}
    </main>
  );
}
