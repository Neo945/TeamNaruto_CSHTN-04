import React, { useState, useEffect } from 'react';
import {  Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../lib/commerce';

export default function Checkout({error,cart,handleCaptureCheckout,order}) {
    const history = useHistory();
    const classes=useStyles();
    const [checkoutToken,setCheckoutToken]=useState();
    const [shippingData,setShippingData]=useState({})
    const steps=['Shipping address','Payment Details']
    const [isFinished,setIsFinished]=useState(false)
    const [activeStep,setActiveStep]=useState(0);
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const Form=()=> activeStep===0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm timeout={timeout} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} shippingData={shippingData }  checkoutToken={checkoutToken}/>
    
        useEffect(() => {
            if (cart.id) {
              const generateTokenID = async () => {
                try {
                  const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
              
                  setCheckoutToken(token);
                } catch {
                  if (activeStep !== steps.length) history.push('/');
                }
              };
        
              generateTokenID();
            }
          }, [cart]);
    
    const next=(data)=>{
         setShippingData(data);
         nextStep()
    }
    const timeout=()=>{

            setIsFinished(true)
     
    }
    let Confirmation = () => (order ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : isFinished ? (
        <>
        <div>
          <Typography variant="h5">Thank you for your purchase!</Typography>
          <Divider className={classes.divider} />
         
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
      ) :
       (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }
    return (<>
    <CssBaseline/>
            <div className={classes.toolbar}/>
            <main className={classes.layout} >
                <Paper className={classes.paper}
                >
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {activeStep===steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
                
            </main>
    </>

            
        
    )
}
