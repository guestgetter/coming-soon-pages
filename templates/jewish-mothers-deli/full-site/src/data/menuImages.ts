// Menu Image Collections for Carousel Display
// Following todo-plan.md aesthetic guidelines

export interface MenuImageCollection {
  categoryId: string
  images: {
    src: string
    alt: string
    title?: string
  }[]
}

export const menuImageCollections: MenuImageCollection[] = [
  // BAGELS & SCHMEARS
  {
    categoryId: 'bagels-schmears',
    images: [
      {
        src: '/menu_images/best-bagels-williamsburg-virginia_optimized.jpg',
        alt: 'Fresh bagels at Jewish Mother\'s Deli in Williamsburg, Virginia',
        title: 'Fresh Daily Bagels'
      },
      {
        src: '/menu_images/delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg',
        alt: 'Fresh bagel with lox and cream cheese',
        title: 'Classic Lox & Bagel'
      },
      {
        src: '/menu_images/sandwich-with-ham-avocado-sauce-caramelized-onions_optimized.jpg',
        alt: 'Everything bagel with scallion cream cheese',
        title: 'Everything Bagel Special'
      },
      {
        src: '/menu_images/still-life-delicious-pastry_optimized.jpg',
        alt: 'Assorted fresh bagels',
        title: 'Fresh Daily Bagels'
      }
    ]
  },
  
  // BAGEL SANDWICHES
  {
    categoryId: 'bagel-sandwiches',
    images: [
      {
        src: '/menu_images/big-portion-baguette-sandwich-full-mixed-sausages-vegetables_optimized.jpg',
        alt: 'The Mensch - pastrami and egg on everything bagel',
        title: 'The Mensch'
      },
      {
        src: '/menu_images/delicious-sandwich-with-melted-cheese-ham_optimized.jpg',
        alt: 'Deli breakfast sandwich with fried egg',
        title: 'Deli Breakfast'
      },
      {
        src: '/menu_images/tasty-sandwich-with-bacon_optimized.jpg',
        alt: 'Mediterranean bagel with whipped feta',
        title: 'Mediterranean Special'
      }
    ]
  },
  
  // DELI SANDWICHES
  {
    categoryId: 'deli-sandwiches',
    images: [
      {
        src: '/menu_images/sandwich-with-salami-lettuce-tomato-arugula_optimized.jpg',
        alt: 'Classic pastrami on rye sandwich',
        title: 'Hot Pastrami on Rye'
      },
      {
        src: '/menu_images/brisket_optimized.jpg',
        alt: 'Slow-cooked brisket plate',
        title: 'House Brisket'
      },
      {
        src: '/menu_images/sandwich-with-ham-avocado-sauce-caramelized-onions_optimized.jpg',
        alt: 'The Reuben with sauerkraut',
        title: 'The Classic Reuben'
      },
      {
        src: '/menu_images/delicious-sandwich-with-melted-cheese-ham_optimized.jpg',
        alt: 'Turkey club on challah',
        title: 'Turkey Club'
      }
    ]
  },
  
  // SOUPS & SIDES
  {
    categoryId: 'soups-sides',
    images: [
      {
        src: '/menu_images/meatballs-soup-with-noodles-board-uncooked-pastas-lemon-greens-dark-background-footage_optimized.jpg',
        alt: 'Traditional matzo ball soup',
        title: 'Matzo Ball Soup'
      },
      {
        src: '/menu_images/still-life-delicious-pastry_optimized.jpg',
        alt: 'Potato latkes with sour cream',
        title: 'Crispy Potato Latkes'
      },
      {
        src: '/menu_images/brisket_optimized.jpg',
        alt: 'House-made pickles and sides',
        title: 'Deli Sides'
      }
    ]
  },
  
  // BAKED GOODS & DESSERTS
  {
    categoryId: 'baked-goods-desserts',
    images: [
      {
        src: '/menu_images/still-life-delicious-pastry_optimized.jpg',
        alt: 'Fresh rugelach and pastries',
        title: 'House-Made Rugelach'
      },
      {
        src: '/menu_images/delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg',
        alt: 'Traditional babka bread',
        title: 'Cinnamon Babka'
      },
      {
        src: '/menu_images/tasty-sandwich-with-bacon_optimized.jpg',
        alt: 'Assorted Jewish desserts',
        title: 'Traditional Desserts'
      }
    ]
  }
]

// Helper function to get images for a specific category
export const getImagesForCategory = (categoryId: string) => {
  const collection = menuImageCollections.find(col => col.categoryId === categoryId)
  return collection?.images || []
}
