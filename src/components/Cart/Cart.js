// import React from 'react'
import useStyles from './styles'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
const Cart = ({ cart }) => {
    const classes = useStyles();

    //not an actual subcomponent but these 2 are functions which will return jsx based on the condn is empty or not
    const EmptyCart = () => (
        <Typography className={classes.title} variant="subtitle1">Your Cart is Empty! Add items to it now
            <Link to="/" className={classes.link}>Shop now</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>

    );
    if (!cart.line_items) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart