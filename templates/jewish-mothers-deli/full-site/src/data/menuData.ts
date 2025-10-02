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
      description: 'Bagel options: $2.49 for plain and $2.99 for flavored. Spreads: $1.00 for plain and $1.50 for flavored.',
      options: ['Plain', 'Everything', 'Sesame', 'Onion', 'Poppy', 'Cinnamon Raisin'],
      items: [
        { id: 'spread-plain', name: 'Plain', description: '', dietary: ['vegetarian'] },
        { id: 'spread-scallion', name: 'Scallion', description: '', dietary: ['vegetarian'] },
        { id: 'spread-tripple-onion', name: 'Tripple Onion', description: '', dietary: ['vegetarian'] },
        { id: 'spread-garlic-herb', name: 'Garlic & Herb', description: '', dietary: ['vegetarian'] },
        { id: 'spread-vegetable', name: 'Vegetable', description: '', dietary: ['vegetarian'] },
        { id: 'spread-honey-pecan', name: 'Honey Pecan', description: '', dietary: ['vegetarian'] },
        { id: 'spread-horseradish-cheddar', name: 'Horseradish & Cheddar', description: '' },
        { id: 'spread-jalapeno', name: 'Jalapeno', description: '', dietary: ['vegetarian'] },
        { id: 'spread-raisin-apple-cinnamon', name: 'Raisin, Apple, & Cinnamon', description: '', dietary: ['vegetarian'] },
        { id: 'spread-whitefish-salad', name: 'Whitefish Salad', description: '' }
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
          description: 'fried egg | choice of bacon | sausage or pastrami with american cheese',
          price: '$8',
          ingredients: ['fried egg', 'choice of bacon | sausage or pastrami', 'american cheese']
        },
        {
          id: 'latke-bomb',
          name: 'The Latke Bomb',
          description: 'fried egg | crispy potato latke | american cheese | scallion cream cheese',
          price: '$8',
          ingredients: ['fried egg', 'crispy potato latke', 'american cheese', 'scallion cream cheese'],
          isSignature: true
        },
        {
          id: 'the-shiksa-italiano',
          name: 'The Shiksa Italiano',
          description: 'prosciutto | whipped feta | roasted red peppers | cucumber | baby arugula | tomato | olive oil drizzle',
          price: '$10',
          ingredients: ['prosciutto', 'whipped feta', 'roasted red peppers', 'cucumber', 'baby arugula', 'tomato', 'olive oil drizzle']
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
          id: 'matzah-ball-soup',
          name: 'Matzah Ball Soup',
          description: '',
          ingredients: [],
          isSignature: true
        },
        {
          id: 'latkes',
          name: 'Latkes (with sour cream or applesauce)',
          description: '',
          ingredients: [],
          dietary: ['vegetarian']
        },
        {
          id: 'potato-salad',
          name: 'Potato Salad',
          description: '',
          ingredients: [],
          dietary: ['vegetarian']
        },
        {
          id: 'house-pickle',
          name: 'House Pickle',
          description: '',
          ingredients: [],
          dietary: ['vegetarian', 'vegan']
        },
        {
          id: 'chips',
          name: 'Chips',
          description: '',
          ingredients: []
        }
      ]
    },
    {
      id: 'baked-goods-desserts',
      name: 'BAKED GOODS & DESSERTS',
      description: 'Traditional Jewish bakery items and desserts',
      items: [
        { id: 'black-white-cookies', name: 'Black & White Cookies', description: '', dietary: ['vegetarian'] },
        { id: 'chocolate-rugelach', name: 'Chocolate Rugelach', description: '', dietary: ['vegetarian'] },
        { id: 'cinnamon-babka', name: 'Cinnamon Babka', description: '', dietary: ['vegetarian'] },
        { id: 'chocolate-cake', name: 'Chocolate Cake', description: '', dietary: ['vegetarian'] },
        { id: 'rainbow-cake', name: 'Rainbow Cake', description: '', dietary: ['vegetarian'] }
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
