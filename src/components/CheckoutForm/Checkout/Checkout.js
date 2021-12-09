import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { commerce } from '../../../lib/commerce';

import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((preActiveStep) => preActiveStep + 1);
    const backStep = () => setActiveStep((preActiveStep) => preActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }
    console.log(order)
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5"> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2"> Order ref: {order.customer_reference}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined"> Back to Home</Button>
            </div>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if (error) {
        <>
            <Typography variant="h5">Something Went Wrong : {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined"> Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout


