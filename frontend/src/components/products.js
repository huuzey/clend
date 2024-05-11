const products = [
  {
    id: 6,
    name: "GoPro HERO9 Black",
    price: 18449.59, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://media.wired.com/photos/5f615b58d2d0ba5ef0f2303c/master/pass/Gear-hero9-black-front-SOURCE-GoPro.jpg",
    description:
      "The GoPro HERO9 Black is a versatile action camera featuring stunning 5K video recording, a new front-facing display, and enhanced stabilization for smooth footage in any environment. It offers advanced features like TimeWarp 3.0, SuperPhoto with HDR, and LiveBurst mode for capturing the perfect shot every time.",
  },
  {
    id: 8,
    name: "Amazon Echo Dot (4th Gen)",
    price: 2049.5, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://www.lifewire.com/thmb/XufAUUq09Gks_v78-XDdt6SFV7g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Amazon-Echo-Dot-4th-Generation-4-f100069b4b7d40dc8661b1614e150934.jpg",
    description:
      "The Amazon Echo Dot (4th Gen) is a compact and versatile smart speaker featuring Alexa voice control, powerful sound, and built-in smart home hub functionality. It offers hands-free voice control for music, news, weather, and more, and can be used to control compatible smart home devices with just your voice.",
  },
  {
    id: 1,
    name: "Samsung Galaxy S21 Ultra",
    price: 46894.5, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://i.blogs.es/d9faf7/samsung-galaxy-s21-ultra-00-02/450_1000.jpg",
    description:
      "The Samsung Galaxy S21 Ultra is a flagship smartphone featuring a stunning 6.8-inch AMOLED display, a powerful Exynos 2100 processor, and a versatile quad-camera system with 100x Space Zoom. It offers advanced features like S Pen support, 5G connectivity, and a large 5000mAh battery.",
  },
  {
    id: 2,
    name: "Apple iPhone 13 Pro Max",
    price: 48095.0, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://media.sketchfab.com/models/4328dea00e47497dbeac73c556121bc9/thumbnails/021d575f06ca4b94bfcf70566b76b91c/c42cce1afa30438a9b3e4a8450520a4f.jpeg",
    description:
      "The Apple iPhone 13 Pro Max is the latest flagship smartphone from Apple, featuring a stunning 6.7-inch Super Retina XDR display, the powerful A15 Bionic chip, and a triple-camera system with advanced computational photography capabilities. It offers all-day battery life, 5G connectivity, and a sleek design.",
  },
  {
    id: 3,
    name: "Sony PlayStation 5",
    price: 20499.59, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image: "https://cdn.mos.cms.futurecdn.net/pocvuNFQseW66Yy2BpqxQN.jpg",
    description:
      "The Sony PlayStation 5 is the next-generation gaming console from Sony, offering immersive gaming experiences with stunning graphics and lightning-fast load times. It features an innovative DualSense controller with haptic feedback and adaptive triggers, as well as a robust library of exclusive games.",
  },
  {
    id: 4,
    name: "Dell XPS 13 Laptop",
    price: 57399.59, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://www.ubuy.com.lk/productimg/?image=aHR0cHM6Ly9pbWFnZXMtY2RuLnVidXkuY28uaWQvNjM1ZjhhZDlhZmVkOGI1NDgzNGZhZmYzLWRlbGwteHBzLTEzLXBsdXMtOTMyMC0xMy00LmpwZw.jpg",
    description:
      "The Dell XPS 13 is a premium ultrabook featuring a beautiful InfinityEdge display, powerful Intel Core processors, and all-day battery life. It offers a sleek and lightweight design, along with advanced features like Thunderbolt 4 connectivity and Windows Hello facial recognition.",
  },
  {
    id: 5,
    name: "Bose QuietComfort 35 II Headphones",
    price: 12259.0, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZurizqgnQdK-1snNJI6k_EQdAeeMfH0VHvkbdWmC_zQ&s",
    description:
      "The Bose QuietComfort 35 II is a premium pair of wireless headphones featuring world-class noise cancellation technology and exceptional sound quality. It offers up to 20 hours of battery life, intuitive touch controls, and support for virtual assistants like Alexa and Google Assistant.",
  },

  {
    id: 7,
    name: "Samsung 55-inch QLED 4K TV",
    price: 46894.5, // Converted from USD to ETB (1 USD = 41.00 ETB)
    image: "https://feelingjazz.pk/wp-content/uploads/2021/07/55Q70A.jpg",
    description:
      "The Samsung 55-inch QLED 4K TV delivers stunning picture quality with Quantum Dot technology, vibrant colors, and deep blacks. It features a sleek design with minimal bezels, smart TV capabilities with built-in voice assistants, and support for HDR content for an immersive viewing experience.",
  },
];
export { products };
