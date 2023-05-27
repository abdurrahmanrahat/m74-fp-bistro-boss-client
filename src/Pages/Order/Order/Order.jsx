import { useState } from 'react';
import orderCover from '../../../assets/order/order.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initialIndex);

    // get data from useMenu hook
    const [menu] = useMenu();


    const dessertMenu = menu.filter(item => item.category === 'dessert');
    const soupMenu = menu.filter(item => item.category === 'soup');
    const saladMenu = menu.filter(item => item.category === 'salad');
    const pizzaMenu = menu.filter(item => item.category === 'pizza');
    const drinksMenu = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            {/* Order Page Title */}
            <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>

            {/* Cover with img */}
            <Cover img={orderCover} title="Order Food"></Cover>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={saladMenu}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizzaMenu}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soupMenu}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessertMenu}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinksMenu}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;