// app/(pages)/[slug]/page.tsx

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">
        {slug.replace(/-/g, " ")}
      </h1>
      <p>This is a dynamic page for {slug}</p>
    </div>
  );
}
