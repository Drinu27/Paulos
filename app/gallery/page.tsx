import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Gallery — Paulos" };

export default function GalleryPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1 className="display display--lg">Gallery</h1>
          <p className="lede mt-24">
            The oven, the plates and the late hours — photographed at Paulos in Munxar.
          </p>
          <div className="crumbs">
            <Link href="/">Home</Link> · Gallery
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--wide">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
