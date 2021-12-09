import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/pngwing.png';
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();



    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" style={{ textDecoration: "none" }} variant="h6" className={classes.titles} color="inherit">
                        <img src={logo} alt="Ez-Buy" height="25px" className={classes.image} />
                        EzzBuy
                    </Typography>
                    <div className={classes.grow} />
                    {(location.pathname === '/') && (
                        <div className={classes.button}>
                            <IconButton component={Link} style={{ textDecoration: "none" }} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
