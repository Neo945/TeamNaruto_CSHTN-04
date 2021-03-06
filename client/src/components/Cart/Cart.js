import React from 'react'
import useStyles from "./styles"
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
export default function Cart({cart,handleUpdateCart,handleRemoveCart,handleEmptyCart}) {
const classes=useStyles();
    const EmptyCart=()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link className={classes.link} to="/">start adding some</Link>!
      </Typography>
    )
    const FilledCart=()=>(
        <>
        <Grid container spacing={3} >
           {
               cart.line_items.map((item)=>(
                   <Grid item xs={12} sm={4} key={item.id} >
                     <CartItem handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} item={item} /> 
                </Grid>

               ))
           }
        </Grid>
        <div className={classes.cardDetails} >
           <Typography variant="h4" >
        Subtotal:{cart.subtotal.formatted_with_symbol}
           </Typography>
           <div>
               <Button className={classes.emptyButton}
               size="large"
               variant="contained"
               color="secondary"
                type="button"
                onClick={handleEmptyCart}
                >Empty Cart</Button>
            <Button className={classes.checkoutButton}
               size="large"
               type="button"
               variant="contained"
               color="primary"
               component={Link}
               to="/checkout"

                >Checkout</Button>
           </div>
        </div>
        </>
    )
    if (!cart.line_items) return 'Loading';
    return (
       	<Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
      </Container>
    )
}
