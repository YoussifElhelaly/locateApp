// data/categories.js
import pharmacy from '../assets/pharmacy.png';
import market from '../assets/market.png';
import electronics from '../assets/electronics.png';
import shirt from '../assets/shirt.png';
import coffee from '../assets/coffee.png';
import food from '../assets/food.png';

export const mainCategories = [
    {
        id: 1,
        name: 'Pharmacy',
        icon: pharmacy,
        subcategories: [
            { id: 13, name: 'Vitamins', icon: pharmacy },
            { id: 14, name: 'Personal Care', icon: pharmacy },
            { id: 15, name: 'First Aid', icon: pharmacy },
            { id: 16, name: 'Baby Care', icon: pharmacy },
        ]
    },
    {
        id: 2,
        name: 'Market',
        icon: market,
        subcategories: [
            { id: 21, name: 'Fresh Produce', icon: market },
            { id: 22, name: 'Dairy Products', icon: market },
            { id: 23, name: 'Bakery', icon: market },
            { id: 24, name: 'Beverages', icon: market },
            { id: 26, name: 'Frozen Foods', icon: market },
        ]
    },
    {
        id: 3,
        name: 'Electronics',
        icon: electronics,
        subcategories: [
            { id: 31, name: 'Mobile Phones', icon: electronics },
            { id: 32, name: 'Laptops', icon: electronics },
            { id: 33, name: 'Accessories', icon: electronics },
            { id: 34, name: 'Gaming', icon: electronics },
            { id: 35, name: 'Audio & Video', icon: electronics },
            { id: 36, name: 'Smart Home', icon: electronics },
        ]
    },
    {
        id: 4,
        name: 'Clothing',
        icon: shirt,
        subcategories: [
            { id: 41, name: 'Men\'s Wear', icon: shirt },
            { id: 42, name: 'Women\'s Wear', icon: shirt },
            { id: 43, name: 'Kids Wear', icon: shirt },
        ]
    },
    {
        id: 5,
        name: 'Coffee',
        icon: coffee,
        subcategories: [
            { id: 51, name: 'Espresso', icon: coffee },
            { id: 52, name: 'Americano', icon: coffee },
            { id: 53, name: 'Latte', icon: coffee },
            { id: 55, name: 'Cold Brew', icon: coffee },
            { id: 56, name: 'Coffee Beans', icon: coffee },
        ]
    },
    {
        id: 6,
        name: 'Foods',
        icon: food,
        subcategories: [
            { id: 61, name: 'Fast Food', icon: food },
            { id: 62, name: 'Italian', icon: food },
            { id: 63, name: 'Chinese', icon: food },
            { id: 64, name: 'Mexican', icon: food },
            { id: 65, name: 'Desserts', icon: food },
            { id: 66, name: 'Healthy Food', icon: food },
        ]
    },
];
