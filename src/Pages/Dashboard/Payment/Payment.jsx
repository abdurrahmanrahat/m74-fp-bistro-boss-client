import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";

// TODO: provide publishable key- Done
const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);
const Payment = () => {

    const [cart] = useCart();
    console.log(cart);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    // const totalPrice = parseFloat(total.toFixed(2));
    const totalPrice = parseFloat(total.toFixed(2));
    // console.log(total ,totalPrice);

    return (
        <div>
            {/* Title */}
            <SectionTitle subHeading="What's Up Bro" heading="Give Money"></SectionTitle>

            {/* Form here */}
            <Elements stripe={stripePromise}>
                <CheckOutForm totalPrice={totalPrice} cart={cart} ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;