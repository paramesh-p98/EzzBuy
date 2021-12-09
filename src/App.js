import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([]);            //React-Hooks - state management
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();    //fetch from commerce.js check commerce docs 
        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);

    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        console.log("inside handleCaptureCheckout");
        try {
            const incomingorder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            console.log(incomingorder);
            setOrder(incomingorder);
            refreshCart();
        } catch (error) {
            console.log("log Error = ", error);
            setErrorMessage("Error= ", error.data.error.message);
        }
    };


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart)
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route path="/"
                        element={
                            <Products products={products} onAddToCart={handleAddToCart} />
                        }>
                    </Route>
                    <Route path="/cart"
                        element={
                            <Cart cart={cart}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                                handleEmptyCart={handleEmptyCart}
                            />
                        }>
                    </Route>
                    <Route path="/checkout"
                        element={
                            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                        }>
                    </Route>
                </Routes>
            </div>
        </Router >
    )
}

export default App;
