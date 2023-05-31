import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    // Handle make admin 
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: `${user.name} is now Admin!`,
                        icon: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // Handle delete an item
    const handleDelete = user => {
        console.log(user);
    }

    return (
        <div className="w-full">
            {/* Page Title */}
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>

            <h3 className="text-3xl font-semibold my-4 text-center">Total Users: {users.length}</h3>

            {/* Table for showing all useres */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-white bg-yellow-600 btn-sm hover:bg-[#BE201D]"><FaUserEdit /></button>

                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-ghost text-white bg-[#BE201D] btn-sm hover:bg-[#BE201D]"><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;