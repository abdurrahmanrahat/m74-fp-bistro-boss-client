import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);

    // for redirect purpose
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);

                const savedUser = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email
                }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div>
            <div className="divider my-0"></div>

            <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline mt-2 mb-4">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;