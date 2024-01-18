import langostino from '../assets/categories/langostino.png'
import maceta from '../assets/categories/maceta.png'
import pizza from '../assets/categories/pizza.png'
import soda from '../assets/categories/soda.png'

export interface ICategorie {
    icon: string,
    name: string
    beautifulName: string,
}

const categories:ICategorie[] = [
  { beautifulName: 'Pizzas tradicionales', icon: pizza, name: "PIZZA_TRAD" },
  { beautifulName: 'Pizzas de mar', icon: langostino,  name: "PIZZA_MAR"},
  { beautifulName: 'Pizzas vegetarianas', icon: maceta, name: "PIZZA_VEG"},
  { beautifulName: 'Bebidas', icon: soda, name: "BEBIDA" }
];

export default categories