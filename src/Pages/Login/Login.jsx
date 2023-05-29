import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import photo from '../../assets/others/login-img.png';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useContext(AuthContext);

    // const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    // for redirect purpose
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // signIn user
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                Swal.fire({
                    title: 'Success!',
                    text: 'User successfully login',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // handle captcha
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        // console.log(value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            {/* Login Form */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2">
                    <div className="text-center">
                        <img src={photo} alt="" />
                    </div>
                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-3xl font-semibold text-center">Login Now!</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="te " name="captcha" placeholder="match these words" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center -mt-4 mb-4'>New here? <Link to="/signup">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;