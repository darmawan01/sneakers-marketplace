export interface Sneaker {
  id: string
  name: string
  brand: string
  price: number
  image: string
  description: string
  category: string
  sizes: number[]
  colors: string[]
  releaseDate: string
  featured?: boolean
}

export interface SneakerFormData {
  name: string;
  brand: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const sneakers: Sneaker[] = [
  {
    id: '1',
    name: 'Air Jordan 1 High OG',
    brand: 'Nike',
    price: 179.99,
    image: 'https://i.ebayimg.com/images/g/IP8AAOSwzJBgROXM/s-l1200.jpg',
    description: "The Air Jordan 1 High OG is the shoe that started it all. Michael Jordan's first signature model was designed by Peter C. Moore and released in 1985.",
    category: 'Basketball',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Red', 'Black', 'White'],
    releaseDate: '2023-01-15',
    featured: true
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    price: 230.00,
    image: 'https://kickstw.com.au/wp-content/uploads/2022/08/Adidas-Yeezy-Boost-350-V2-Slate-5.jpg',
    description: 'The Yeezy Boost 350 V2 features a Primeknit upper with a translucent side stripe and Boost midsole for responsive cushioning.',
    category: 'Lifestyle',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Zebra', 'Black', 'White'],
    releaseDate: '2023-02-20',
    featured: true
  },
  {
    id: '3',
    name: 'New Balance 550',
    brand: 'New Balance',
    price: 110.00,
    image: 'https://cdn-images.farfetch-contents.com/20/51/04/93/20510493_50443710_1000.jpg',
    description: 'The New Balance 550 is a classic basketball-inspired sneaker that combines retro styling with modern comfort.',
    category: 'Lifestyle',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Green', 'White', 'Grey'],
    releaseDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    price: 100.00,
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6e32184d-479b-4a1d-a917-d3ecbdc69d5b/AIR+FORCE+1+%2707+LV8.png',
    description: 'The Air Force 1 Low is a classic basketball shoe that has become a streetwear staple.',
    category: 'Lifestyle',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['White', 'Black', 'Red'],
    releaseDate: '2023-04-05'
  },
  {
    id: '5',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 190.00,
    image: 'https://i.ebayimg.com/images/g/vXsAAOSwTM5iKyFK/s-l1200.jpg',
    description: 'The Ultra Boost 22 features responsive Boost cushioning and a Primeknit upper for a sock-like fit.',
    category: 'Running',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Black', 'White', 'Blue'],
    releaseDate: '2023-05-15'
  }
]

export const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Other'];
export const categories = ['All', 'Basketball', 'Lifestyle', 'Running'] 