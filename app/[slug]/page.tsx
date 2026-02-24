

import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { imagePath, profileAPI } from "../utils/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { cache } from "react";


interface PageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  status: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
}


const SITE_NAME = "Auto Parts Xchange";
const SITE_URL = "http://autopartsxchange.co.za";


const getPage = cache(async (slug: string): Promise<PageData | null> => {
  const res = await fetch(
    `${profileAPI}/cms/${slug}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;
  return res.json();
});



export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params;

  const page = await getPage(slug);
  if (!page) return {};

  const title = page.meta_title || page.title;
  const description = page.meta_description;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${page.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${imagePath}/${page.thumbnail}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {

  const { slug } = await params;

  const page = await getPage(slug);

  if (!page ) {
    notFound();
  }

  const fixedContent = page.content.replace(/<p\/>/g, "</p>");

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen">
        <section className="relative h-[450px] w-full">
          { page.thumbnail && ( <Image
            src={`${imagePath}/${page.thumbnail}`}
            alt={page.title}
            fill
            priority
            className="object-cover"
            /> )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-end">
            <div className="max-w-6xl mx-auto px-6 mb-[100]">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
                {page.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14">
          <article
            className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-gray-600"
            dangerouslySetInnerHTML={{ __html: fixedContent }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}