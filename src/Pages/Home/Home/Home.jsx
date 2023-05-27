import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BistroBoss from "../BistroBoss/BistroBoss";
import CallUs from "../CallUs/CallUs";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            {/* Home page Title */}
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>

            {/* Banner Section */}
            <Banner></Banner>

            {/* Category with Swiper */}
            <Category></Category>

            {/* Bistro Boss Section */}
            <BistroBoss></BistroBoss>

            {/* Popular Menu */}
            <PopularMenu></PopularMenu>

            {/* Call Us */}
            <CallUs></CallUs>

            {/* Featured Section */}
            <Featured></Featured>

            {/* Testimonials Section */}
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;