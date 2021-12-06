// import React from 'react'
import useStyles from './styles'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import emptyimage from '../../assets/empty-cart.gif';
const Cart = ({ cart, handleUpdateCartQty, handleEmptyCart, handleRemoveFromCart }) => {
    const classes = useStyles();

    //not an actual subcomponent but these 2 are functions which will return jsx based on the condn is empty or not
    const EmptyCart = () => (
        <>
            <Typography className={classes.title} variant="subtitle1" align="center" >Your Cart is Empty! <br /> Add items to it&nbsp;
                <Link to="/" className={classes.link} style={{ textDecoration: "none", color: "deeppink" }}>Shop now</Link>
                <div>
                    <img src={emptyimage} alt="empty-cart" className={classes.image} width="300px" />
                </div>
            </Typography>
        </>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
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
