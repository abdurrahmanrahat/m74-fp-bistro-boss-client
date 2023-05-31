import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';


const AddItem = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    console.log(errors);

    return (
        <div className="w-full">
            <SectionTitle subHeading="What's New Boss" heading="Add An Item"></SectionTitle>

            {/* Form For Add Items */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-10">
                {/* Recipe Name Field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" {...register("name", { required: true, maxLength: 80 })} className="input input-bordered w-full max-w-xs" />
                </div>

                {/* Category Field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Category*</span>
                    </label>
                    <select {...register("category", { required: true })} className="select select-bordered">
                        <option disabled selected>Pick one</option>
                        <option>Pizza</option>
                        <option>Soup</option>
                        <option>Salad</option>
                        <option>Drinks</option>
                        <option>Desserts</option>
                    </select>
                </div>

                {/* Price Field */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Price*</span>
                    </label>
                    <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full max-w-xs" />
                </div>

                {/* Recipe Details */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea {...register("details", { required: true })} className="textarea textarea-bordered h-24" placeholder="Details here"></textarea>
                </div>

                {/* File Upload */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image*</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>

                {/* Submit Button */}
                <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;