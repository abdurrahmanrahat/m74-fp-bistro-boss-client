import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featureImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white py-8 my-24">
            {/* Title */}
            <SectionTitle
                heading={'Featured Item'}
                subHeading={'Check it out'}
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-black bg-opacity-40 py-16 px-36">
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>March 20, 2025</p>
                    <p className="uppercase text-xl">WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white mt-4">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;