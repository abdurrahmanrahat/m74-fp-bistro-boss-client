import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const MyCart = () => {

    const [cart, refetch] = useCart();

    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

    // Handle delete an item
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="">
            {/* Page Title */}
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="uppercase flex justify-evenly my-4 items-center gap-10">
                <h2 className="text-3xl font-semibold">Total Items: {cart?.length}</h2>
                <h2 className="text-3xl font-semibold">Total Price: ${totalPrice}</h2>
                <button className="btn btn-warning text-white">PAY</button>
            </div>

            {/* Cart Item with Table */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td className="text-end">${item.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost text-white bg-[#BE201D] btn-sm hover:bg-[#BE201D]"><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyCart;