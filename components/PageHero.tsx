import Image from "next/image";
import Link from "next/link";

type Props = {
  title: React.ReactNode;
  image: string;
  imageAlt: string;
  crumb: string;
};

/** Full-screen photograph with the page title sitting on the bottom edge. */
export default function PageHero({ title, image, imageAlt, crumb }: Props) {
  return (
    <section className="page-hero">
      <Image src={image} alt={imageAlt} fill sizes="100vw" priority />
      <div className="container">
        <h1 className="display display--hero">{title}</h1>
        <div className="crumbs">
          <Link href="/">Home</Link> · {crumb}
        </div>
      </div>
    </section>
  );
}
