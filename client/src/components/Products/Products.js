import { Grid } from '@material-ui/core'
import React from 'react'
import Chatbot from '../Chatbot/Chatbot.js';
import Product from './Product.js'
import useStyles from "./stylesProducts"
export default function Products({products,handleAddToCart,handleEmptyCart,user}) {
    const classes=useStyles();

    return (<>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} handleAddToCart={handleAddToCart} handleEmptyCart={handleEmptyCart} />
            </Grid>
          ))}
        </Grid>
      </main>
  <Chatbot user={user}/>
    </>)
}
