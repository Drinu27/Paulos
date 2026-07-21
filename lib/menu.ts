export type MenuItem = {
  /** Absent on note rows */
  name?: string;
  price?: string;
  desc?: string;
  /** House favourite — shown with a gold diamond */
  star?: boolean;
  /** A note rather than a dish (e.g. "extra ingredient €1.00") */
  note?: boolean;
};

export type MenuGroup = {
  /** Matches the filter button */
  category: string;
  heading: string;
  items: MenuItem[];
};

export const MENU_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "salads", label: "Salads" },
  { id: "artisan", label: "Artisan Pizza" },
  { id: "signature", label: "Signature Pizza" },
  { id: "burgers", label: "Burgers" },
  { id: "wraps", label: "Wraps" },
  { id: "kids", label: "Kids" },
  { id: "sides", label: "Sides & Sauces" },
];

const EXTRA_NOTE: MenuItem = { note: true, desc: "For extra ingredient add €1.00" };

export const MENU: MenuGroup[] = [
  {
    category: "starters",
    heading: "Starters",
    items: [
      { name: "Mini Arancini x8", price: "€6.00", desc: "Served with truffle mayo." },
      { name: "Crispy Chicken Wings x6", price: "€7.50", desc: "Served with sweet chili sauce." },
      {
        name: "Loaded Beef Nachos",
        price: "€8.00",
        desc: "Tortilla chips, beef minced, parmesan cheese, onions, cherry tomatoes, roasted garlic aioli.",
      },
    ],
  },
  {
    category: "salads",
    heading: "Salads",
    items: [
      {
        name: "Chicken Caesar",
        price: "€12.50",
        desc: "Grilled chicken breast, mixed greens, cherry tomatoes, carrots, onions, bacon, croutons, parmesan cheese & caesar sauce.",
      },
      {
        name: "Burrata & Prosciutto",
        price: "€12.50",
        desc: "Burrata, parma ham, mixed greens, cherry tomatoes, carrots, onions, almond seeds & fig jam.",
      },
      {
        name: "Mediterranean Tuna",
        price: "€10.00",
        desc: "Tuna, mixed greens, cherry tomatoes, carrots, onions, sweet corn, olives, capers, boiled egg, quinoa, black beans & house dressing.",
      },
      {
        name: "Steak & Pistachio",
        price: "€15.50",
        desc: "Grilled beef, mixed greens, cherry tomatoes, parmesan cheese, pistachio & house dressing.",
      },
    ],
  },
  {
    category: "artisan",
    heading: "Artisan Pizza",
    items: [
      { name: "Margherita", price: "€7.00", desc: "Tomato sauce, mozzarella, oregano." },
      { name: "Pepperoni", price: "€7.50", desc: "Tomato sauce, mozzarella, pepperoni, oregano." },
      { name: "Al Funghi", price: "€7.50", desc: "Tomato sauce, mozzarella, mushrooms, oregano." },
      {
        name: "Capricosa",
        price: "€8.50",
        desc: "Tomato sauce, mozzarella, mushrooms, ham, sausages, green pepper, eggs, oregano.",
      },
      {
        name: "Al Tonno",
        price: "€9.00",
        desc: "Tomato sauce, mozzarella, onions, green olives, tuna, oregano.",
      },
      {
        name: "Gozitana",
        price: "€9.50",
        desc: "Tomato sauce, mozzarella, fresh tomatoes, onions, green olives, capers, anchovies, oregano.",
      },
      {
        name: "Paulos",
        price: "€9.50",
        desc: "Tomato sauce, mozzarella, mushrooms, ham, sausages, onions, green peppers, capers, salami, eggs, oregano.",
      },
      {
        name: "Seafood",
        price: "€10.00",
        desc: "Tomato sauce, mozzarella, onions, green olives, tuna, seafood, oregano.",
      },
      EXTRA_NOTE,
    ],
  },
  {
    category: "signature",
    heading: "Signature Pizza",
    items: [
      {
        name: "BBQ Chicken",
        price: "€10.50",
        desc: "Tomato sauce, mozzarella, mushrooms, bacon, onions, green peppers, chicken, bbq sauce, oregano.",
      },
      {
        name: "BBQ Pulled Pork",
        price: "€10.50",
        desc: "Tomato sauce, mozzarella, mushrooms, bacon, onions, green peppers, pulled pork, bbq sauce, oregano.",
      },
      {
        name: "Chicken Pesto",
        price: "€11.00",
        desc: "House pesto, mozzarella, onions, bacon, tomatoes, chicken, oregano.",
      },
      {
        name: "Cranberry Chicken",
        price: "€11.50",
        star: true,
        desc: "Cranberry sauce, mozzarella, onions, green peppers, chicken, pepperoni, oregano.",
      },
      {
        name: "Meat Lovers",
        price: "€11.50",
        desc: "Tomato sauce, mozzarella, mushrooms, onions, green peppers, sausages, bacon, pulled meat, pepperoni, oregano.",
      },
      {
        name: "Beefy Jack",
        price: "€12.00",
        star: true,
        desc: "Tomato sauce, mozzarella, green peppers, onions, sweet corn, minced beef, jack daniels bbq sauce, pepperoni, oregano.",
      },
      EXTRA_NOTE,
    ],
  },
  {
    category: "burgers",
    heading: "Gourmet Burgers",
    items: [
      {
        note: true,
        desc: "All buns toasted, served with normal fries. For extra ingredient add €1.00",
      },
      {
        name: "Classic New Haven",
        price: "€9.00",
        desc: "Beef patty, american cheese, pickles, lettuce & burger sauce.",
      },
      {
        name: "Texas Chicken",
        price: "€9.50",
        desc: "Crispy fried chicken breast, cabbage slaw & burger sauce.",
      },
      {
        name: "Truffle Parm",
        price: "€11.00",
        desc: "Beef patty, rocket leaves, grilled mushrooms, parmesan cheese & truffle mayo.",
      },
      {
        name: "Smoky Chilly",
        price: "€11.50",
        desc: "Beef patty, smoked cheddar, bacon jam, crispy onions, jalapenos & sweet chili sauce.",
      },
      {
        name: "Mac Attack",
        price: "€12.50",
        star: true,
        desc: "Beef patty, fried mac n cheese, american cheese, caramelized onions, lettuce, tomatoes & burger sauce.",
      },
      {
        name: "Whisky Glaze",
        price: "€12.50",
        desc: "Beef patty, cabbage slaw, bacon, smoked cheese, crispy onions & whisky sauce.",
      },
      {
        name: "Spiroz Royal",
        price: "€15.50",
        star: true,
        desc: "Double beef patties, whisky cheese, fried egg, bacon, onion rings, rocket leaves, parmesan snow & roasted garlic aioli.",
      },
    ],
  },
  {
    category: "wraps",
    heading: "Wraps",
    items: [
      { note: true, desc: "All wraps toasted, served with normal fries." },
      {
        name: "Crispy Chicken Wrap",
        price: "€9.50",
        desc: "Crispy fried chicken breast, lettuce, caramelized onions, tomatoes & house sauce.",
      },
      {
        name: "Grilled Chicken Wrap",
        price: "€10.50",
        desc: "Grilled chicken breast, lettuce, caramelized onions, tomatoes, bacon & house sauce.",
      },
    ],
  },
  {
    category: "kids",
    heading: "Kids",
    items: [
      { name: "Chicken Nuggets x6 & Chips", price: "€6.50" },
      {
        name: "Chicken Burger",
        price: "€6.50",
        desc: "Fried chicken, lettuce, tomatoes, caramelized onions & fries.",
      },
      {
        name: "Beef Burger",
        price: "€6.50",
        desc: "Beef patty, lettuce, tomatoes, caramelized onions & fries.",
      },
    ],
  },
  {
    category: "sides",
    heading: "Sides",
    items: [
      { name: "Small Fries", price: "€3.00" },
      { name: "Large Fries", price: "€5.50" },
      { name: "Truffle & Parmesan Fries", price: "€4.50", desc: "Small portion." },
      { name: "Bacon & Cheese Fries", price: "€4.50", desc: "Small portion." },
    ],
  },
  {
    category: "sides",
    heading: "Sauces",
    items: [
      { name: "House Burger Sauce", price: "€1.00" },
      { name: "Truffle Mayo", price: "€1.00" },
      { name: "Sweet Chili", price: "€1.00" },
      { name: "Whisky Sauce", price: "€1.00" },
      { name: "Roasted Garlic Aioli", price: "€1.50" },
    ],
  },
];
