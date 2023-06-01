import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_img_uplode_token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data)

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL };

                    console.log(newItem);
                    // send newItem to the server with axios secure
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('After posting new item', data.data);
                            if (data.data.insertedId) {
                                // alert
                                reset();
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'NewItem Successfully Added',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };

    return (
        <div className="w-full">
            <SectionTitle subHeading="What's New Boss" heading="Add An Item"></SectionTitle>

            {/* Form For Add Items */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-10">
                {/* Recipe Name Field */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" {...register("name", { required: true, maxLength: 80 })} className="input input-bordered w-full " />
                </div>

                <div className="md:flex gap-10">
                    {/* Category Field */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Drinks</option>
                            <option>Dessert</option>
                            <option>Desi</option>
                        </select>
                    </div>

                    {/* Price Field */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full " />
                    </div>
                </div>

                {/* Recipe Details */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Details here"></textarea>
                </div>

                {/* File Upload */}
                <div className="form-control w-full mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>

                {/* Submit Button */}
                <div className="text-center my-10">
                    <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
                </div>
            </form>
        </div>
    );
};

export default AddItem;