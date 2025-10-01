// Menu Data Structure for Jewish Mother's Deli
// Complete menu system with categories and items

export interface MenuItem {
  id: string
  name: string
  description: string
  price?: string
  ingredients?: string[]
  isSignature?: boolean
  dietary?: string[] // e.g., ['vegetarian', 'dairy-free']
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
  options?: string[] // e.g., bread options for deli sandwiches
}

export interface MenuData {
  categories: MenuCategory[]
}

// Complete Menu Data
export const menuData: MenuData = {
  categories: [
    {
      id: 'bagels-schmears',
      name: 'BAGELS & SCHMEARS',
      description: 'Fresh-baked bagels with artisanal spreads',
      options: ['Plain', 'Everything', 'Sesame', 'Onion', 'Poppy', 'Cinnamon Raisin'],
      items: [
        {
          id: 'plain-cream-cheese',
          name: 'Plain Cream Cheese',
          description: 'Classic smooth and creamy spread',
          ingredients: ['cream cheese']
        },
        {
          id: 'scallion-cream-cheese',
          name: 'Scallion Cream Cheese',
          description: 'Fresh scallions mixed with cream cheese',
          ingredients: ['cream cheese', 'fresh scallions']
        },
        {
          id: 'lox-spread',
          name: 'Lox Spread',
          description: 'Premium smoked salmon spread',
          ingredients: ['smoked salmon', 'cream cheese', 'capers', 'dill'],
          isSignature: true
        },
        {
          id: 'veggie-cream-cheese',
          name: 'Veggie Cream Cheese',
          description: 'Garden vegetables mixed with cream cheese',
          ingredients: ['cream cheese', 'cucumber', 'tomato', 'red onion', 'herbs'],
          dietary: ['vegetarian']
        },
        {
          id: 'whitefish-salad',
          name: 'Whitefish Salad',
          description: 'Traditional Jewish deli whitefish salad',
          ingredients: ['smoked whitefish', 'celery', 'onion', 'mayo']
        },
        {
          id: 'honey-walnut-cream-cheese',
          name: 'Honey Walnut Cream Cheese',
          description: 'Sweet and crunchy artisanal spread',
          ingredients: ['cream cheese', 'honey', 'toasted walnuts'],
          dietary: ['vegetarian']
        }
      ]
    },
    {
      id: 'bagel-sandwiches',
      name: 'BAGEL SANDWICHES',
      description: 'Signature sandwiches on fresh bagels',
      items: [
        {
          id: 'classic-lox',
          name: 'The Classic Lox',
          description: 'lox | cream cheese | tomato | red onion | capers',
          price: '$10',
          ingredients: ['lox', 'cream cheese', 'tomato', 'red onion', 'capers'],
          isSignature: true
        },
        {
          id: 'the-mensch',
          name: 'The Mensch',
          description: 'fried egg | pastrami | american cheese',
          price: '$8',
          ingredients: ['fried egg', 'pastrami', 'american cheese']
        },
        {
          id: 'deli-breakfast',
          name: 'The Deli Breakfast',
          description: 'fried egg | choice of bacon, sausage or pastrami | american cheese',
          price: '$8',
          ingredients: ['fried egg', 'choice of bacon, sausage or pastrami', 'american cheese']
        },
        {
          id: 'latke-bomb',
          name: 'The Latke Bomb',
          description: 'fried egg | crispy potato latke | american cheese | scallion cream cheese',
          price: '$9',
          ingredients: ['fried egg', 'crispy potato latke', 'american cheese', 'scallion cream cheese'],
          isSignature: true
        },
        {
          id: 'mediterranean',
          name: 'The Mediterranean',
          description: 'whipped feta | roasted red peppers | cucumber | baby arugula | tomato | olive oil drizzle',
          price: '$8',
          ingredients: ['whipped feta', 'roasted red peppers', 'cucumber', 'baby arugula', 'tomato', 'olive oil drizzle'],
          dietary: ['vegetarian']
        }
      ]
    },
    {
      id: 'deli-sandwiches',
      name: 'DELI SANDWICHES',
      description: 'Classic deli sandwiches on your choice of bread',
      options: ['Rye', 'Challah', 'Bagel', 'Whole Wheat'],
      items: [
        {
          id: 'hot-pastrami',
          name: 'Hot Pastrami',
          description: 'house-steamed | hand-sliced | deli mustard',
          price: '8oz $15 / 16oz $28',
          ingredients: ['house-steamed pastrami', 'hand-sliced', 'deli mustard'],
          isSignature: true
        },
        {
          id: 'corned-beef',
          name: 'Corned Beef',
          description: 'swiss | sauerkraut | russian dressing | grilled rye',
          price: '8oz $15 / 16oz $28',
          ingredients: ['choice of pastrami or corned beef', 'swiss cheese', 'sauerkraut', 'russian dressing', 'grilled rye']
        },
        {
          id: 'the-reuben',
          name: 'The Reuben',
          description: 'corned beef | swiss | sauerkraut | russian dressing | grilled rye',
          price: '8oz $15 / 16oz $28',
          ingredients: ['corned beef', 'swiss', 'sauerkraut', 'russian dressing', 'grilled rye'],
          isSignature: true
        },
        {
          id: 'tuna-melt',
          name: 'Tuna Melt',
          description: 'albacore tuna salad | American cheese | grilled rye',
          price: '$12',
          ingredients: ['albacore tuna salad', 'american cheese', 'grilled rye']
        },
        {
          id: 'turkey-club',
          name: 'Turkey Club',
          description: 'roasted turkey | lettuce | tomato | American cheese | mayo or mustard | challah',
          price: '$12',
          ingredients: ['roasted turkey', 'lettuce', 'tomato', 'american cheese', 'challah', 'mayo or mustard']
        },
        {
          id: 'roast-beef-sandwich',
          name: 'Roast Beef Sandwich',
          description: 'thin-sliced roast beef | havarti | lettuce | tomato | caramelized onion mayo | challah',
          price: '$12',
          ingredients: ['thin-sliced roast beef', 'havarti', 'lettuce', 'tomato', 'caramelized onion mayo']
        },
        {
          id: 'egg-salad-sandwich',
          name: 'Egg Salad Sandwich',
          description: 'classic deli-style egg salad | lettuce | tomato | challah',
          price: '$11',
          ingredients: ['classic deli-style egg salad', 'lettuce', 'tomato', 'choice of bread'],
          dietary: ['vegetarian']
        }
      ]
    },
    {
      id: 'soups-sides',
      name: 'SOUPS & SIDES',
      description: 'Traditional Jewish deli soups and sides',
      items: [
        {
          id: 'matzo-ball-soup',
          name: 'Matzo Ball Soup',
          description: 'Grandma\'s recipe with fluffy matzo balls',
          ingredients: ['matzo balls', 'rich chicken broth', 'fresh dill'],
          isSignature: true
        },
        {
          id: 'potato-salad',
          name: 'Potato Salad',
          description: 'Traditional deli-style potato salad',
          ingredients: ['yukon potatoes', 'celery', 'onion', 'mayo', 'herbs'],
          dietary: ['vegetarian']
        },
        {
          id: 'coleslaw',
          name: 'Coleslaw',
          description: 'Fresh and tangy coleslaw',
          ingredients: ['cabbage', 'carrots', 'creamy dressing'],
          dietary: ['vegetarian']
        },
        {
          id: 'pickles',
          name: 'Deli Pickles',
          description: 'House-made kosher dill pickles',
          ingredients: ['cucumbers', 'dill', 'garlic', 'spices'],
          dietary: ['vegetarian', 'vegan']
        },
        {
          id: 'potato-latkes',
          name: 'Potato Latkes',
          description: 'Crispy potato pancakes with applesauce',
          ingredients: ['grated potatoes', 'onion', 'applesauce', 'sour cream'],
          dietary: ['vegetarian']
        }
      ]
    },
    {
      id: 'baked-goods-desserts',
      name: 'BAKED GOODS & DESSERTS',
      description: 'Traditional Jewish bakery items and desserts',
      items: [
        {
          id: 'rugelach',
          name: 'Rugelach',
          description: 'Traditional Jewish pastry with cinnamon and nuts',
          ingredients: ['cream cheese dough', 'cinnamon', 'walnuts', 'raisins'],
          dietary: ['vegetarian']
        },
        {
          id: 'chocolate-babka',
          name: 'Chocolate Babka',
          description: 'Rich chocolate swirl bread',
          ingredients: ['brioche dough', 'chocolate filling', 'streusel topping'],
          dietary: ['vegetarian']
        },
        {
          id: 'black-white-cookies',
          name: 'Black & White Cookies',
          description: 'Classic NYC bakery cookies',
          ingredients: ['vanilla cake cookie', 'chocolate fondant', 'vanilla fondant'],
          dietary: ['vegetarian']
        },
        {
          id: 'ny-cheesecake',
          name: 'New York Cheesecake',
          description: 'Rich and creamy NY-style cheesecake',
          ingredients: ['cream cheese', 'graham cracker crust', 'berry compote'],
          dietary: ['vegetarian']
        },
        {
          id: 'challah-bread',
          name: 'Challah Bread',
          description: 'Traditional braided egg bread',
          ingredients: ['eggs', 'honey', 'sesame seeds'],
          dietary: ['vegetarian']
        }
      ]
    }
  ]
}

// Helper functions
export const getMenuCategoryById = (id: string): MenuCategory | undefined => {
  return menuData.categories.find(category => category.id === id)
}

export const getMenuItemById = (categoryId: string, itemId: string): MenuItem | undefined => {
  const category = getMenuCategoryById(categoryId)
  return category?.items.find(item => item.id === itemId)
}

export const getSignatureItems = (): MenuItem[] => {
  return menuData.categories.flatMap(category => 
    category.items.filter(item => item.isSignature)
  )
}

export const getItemsByDietary = (dietaryRestriction: string): MenuItem[] => {
  return menuData.categories.flatMap(category =>
    category.items.filter(item => 
      item.dietary?.includes(dietaryRestriction)
    )
  )
}
