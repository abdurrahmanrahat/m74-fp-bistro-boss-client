import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import menuImg from '../../../assets/menu/menu-bg.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
    const [menu] = useMenu();
    const dessertMenu = menu.filter(item => item.category === 'dessert');
    const soupMenu = menu.filter(item => item.category === 'soup');
    const saladMenu = menu.filter(item => item.category === 'salad');
    const pizzaMenu = menu.filter(item => item.category === 'pizza');
    const offeredMenu = menu.filter(item => item.category === 'offered');

    return (
        <div>
            {/* Menu Page Title */}
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            {/* Cover */}
            <Cover img={menuImg} title='Our Menu'></Cover>

            {/* Offer Section */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            <MenuCategory items={offeredMenu}></MenuCategory>

            {/* Dessert menu items */}
            <MenuCategory
                items={dessertMenu}
                title="dessert"
                img={dessertImg}
            ></MenuCategory>

            {/* Pizza Menu Items */}
            <MenuCategory
                items={pizzaMenu}
                title="pizza"
                img={pizzaImg}
            ></MenuCategory>

            {/* Pizza Menu Items */}
            <MenuCategory
                items={saladMenu}
                title="salad"
                img={saladImg}
            ></MenuCategory>

            {/* Soup Menu Items */}
            <MenuCategory
                items={soupMenu}
                title="soup"
                img={soupImg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;