import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import './CheckOutForm.css';


const CheckOutForm = ({ totalPrice, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    // console.log(totalPrice);

    // use useEffect for
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [totalPrice, axiosSecure])


    // Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        console.log('card', card);

        // create payment method on stripe with await and get error and paymentMethod from it. 
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log('paymentMethod', paymentMethod);
        }

        setProcessing(true);

        // code from stripe confirm payment method
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Unknown',
                        name: user?.displayName || 'Anonymous User'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('Payment Intent', paymentIntent);
        setProcessing(false);
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            const transactionId = paymentIntent.id;

            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId,
                totalPrice,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.foodId),
                status: 'Service Pending',
                itemNames: cart.map(item => item.name)
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // display confirm via sweet alert. 
                    }
                })
        }

    }

    return (
        <>
            <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-center items-center my-8">
                    <button className="btn btn-outline btn-primary btn-xl" type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>

            <div className="text-center">
                {
                    cardError && <p className="text-red-600 text-xl">{cardError}</p>
                }
                {
                    transactionId && <p className="text-green-600 text-xl">Transaction complete with transactionId: {transactionId}</p>
                }
            </div>
        </>
    );
};

export default CheckOutForm;