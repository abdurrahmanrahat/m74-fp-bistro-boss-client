import { useForm } from 'react-hook-form';
import photo from '../../assets/others/login-img.png';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                // user update
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const savedUser = {
                            name: data.name,
                            email: data.email
                        }

                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    // 
                                    reset();
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'User successfully signup',
                                        icon: 'success',
                                        confirmButtonText: 'Cool'
                                    })
                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => console.log(err.message))
            })
            .catch(err => {
                console.log(err.message);
            })
    };


    return (
        <>
            {/* Using Helmet */}
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>

            {/* form */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center w-1/2">
                        <img src={photo} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-3xl font-semibold text-center">SignUp</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} name="photo" placeholder="Photo URL" className="input input-bordered" />
                                {errors.photo && <span className='text-red-600'>Photo URL is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password maximum 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase, lowercase, number & symbol</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center -mt-4 mb-4'>Already have an account? <Link to="/login">Please login</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;