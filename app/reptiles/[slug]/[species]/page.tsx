import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReptile, reptiles } from "@/data/reptiles";
import type { ReptileSpecies } from "@/data/reptiles";

type Props = {
  params: Promise<{ slug: string; species: string }>;
};

export default async function SubSpeciesPage({ params }: Props) {
  const { slug, species } = await params;
  const parent = getReptile(slug);
  if (!parent || !parent.species) notFound();
  const s = parent.species.find((sp) => sp.slug === species) as ReptileSpecies | undefined;
  if (!s) notFound();

  return (
    <>
      <section className="guide-hero">
        <div className="guide-hero-media">
          <Image src={s.image} alt={s.imageAlt} fill priority sizes="100vw" />
        </div>
        <div className="guide-hero-shade" />
        <div className="guide-hero-copy">
          <p className="eyebrow">{parent.name} · {s.scientificHint}</p>
          <h1 className="guide-title">{s.name}</h1>
          <p className="page-intro">{s.description}</p>
        </div>
      </section>
      <section className="section">
        <Link href={`/reptiles/${slug}`} className="btn secondary">← Back to {parent.name}</Link>
      </section>
    </>
  );
}
