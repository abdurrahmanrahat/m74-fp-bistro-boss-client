import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularMenu = menu.filter(item => item.category === 'popular');


    return (
        <section>
            {/* Title */}
            <SectionTitle
                heading={'FROM OUR MENU'}
                subHeading={'Check it out'}
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {
                    popularMenu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            
            {/* Button */}
            <div className="text-center">
                <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;