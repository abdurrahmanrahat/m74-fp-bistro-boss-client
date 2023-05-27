import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-neutral text-white text-center p-14">
                    <h4 className="text-3xl mb-4">CONTACT US</h4>
                    <div>
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>+88 123456789</p>
                        <p>Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>
                <div className="bg-blue-950 text-white text-center p-14">
                    <h4 className="text-3xl mb-4">Follow US</h4>
                    <p>Join us on social media</p>
                    <div className='flex gap-4 text-2xl justify-center mt-2 items-center'>
                        <Link><FaFacebook /></Link>
                        <Link><FaInstagram /></Link>
                        <Link><FaTwitter /></Link>
                    </div>
                </div>
            </footer>
            <div className="footer footer-center p-4 bg-slate-950 text-white">
                <div>
                    <p>Copyright © {new Date().getUTCFullYear()} - All right reserved by ACME Industries Ltd</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;