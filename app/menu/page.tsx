import MenuList from "@/components/MenuList";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Menu",
  description:
    "The full Paulos menu — artisan and signature pizzas, house-grilled burgers, salads, wraps and sides, made fresh in Munxar, Gozo.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        title="The Menu"
        image="/images/menu-hero.jpg"
        imageAlt="A Beefy Jack pizza served with a burger and fries"
        crumb="Menu"
      />

      <section className="section">
        <div className="container">
          <MenuList />
        </div>
      </section>
    </>
  );
}
