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
      }
    ]
  },
  
  // BAGEL SANDWICHES
  {
    categoryId: 'bagel-sandwiches',
    images: [
      {
        src: '/menu_images/bagel-sandwiches-williamsburg_optimized.jpg',
        alt: 'Bagel sandwiches at Jewish Mother\'s Deli in Williamsburg',
        title: 'Signature Bagel Sandwiches'
      }
    ]
  },
  
  // DELI SANDWICHES
  {
    categoryId: 'deli-sandwiches',
    images: [
      {
        src: '/menu_images/williamsburg-deli-sandwich_optimized.jpg',
        alt: 'Classic deli sandwich at Jewish Mother\'s Deli in Williamsburg',
        title: 'Signature Deli Sandwich'
      }
    ]
  },
  
  // SOUPS & SIDES  
  {
    categoryId: 'soups-sides',
    images: [
      {
        src: '/menu_images/matzo-ball-soup-williamsburg-va_optimized.jpg',
        alt: 'Traditional matzo ball soup at Jewish Mother\'s Deli in Williamsburg, VA',
        title: 'Matzo Ball Soup'
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
      }
    ]
  }
]

// Helper function to get images for a specific category
export const getImagesForCategory = (categoryId: string) => {
  const collection = menuImageCollections.find(col => col.categoryId === categoryId)
  return collection?.images || []
}
