import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

// onClick={handleEmptyCart}

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes = useStyles();
    

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping Cart,
          <Link to='/' className={classes.link}> start adding some</Link>!
        </Typography>
      );

      if (!cart.line_items) return 'Loading';

      const FilledCart = () => (
        <>
          <Grid container spacing={3}>
            {cart.line_items.map((lineItem) => (
              <Grid item xs={12} sm={4} key={lineItem.id}>
                {/* <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} /> */}
                <CartItem item={lineItem} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
              </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
              <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
              <Button className={classes.checkoutButton}  size="large" type="button" variant="contained" color="primary" component={Link} to='/checkout' >Checkout</Button>
            </div>
          </div>
        </>
      );

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your shopping cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart
