import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {/* Cover */}
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-8 mt-16 mb-8">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            {/* Button */}
            <div className="text-center">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mb-12">Order Now</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;