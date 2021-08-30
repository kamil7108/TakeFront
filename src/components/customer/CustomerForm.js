import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch'
    },
  },
}));

const CustomerForm = () => {
  const classes = useStyles();
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [address,setAddress] = useState("")

  const checkState = () => {
    return firstname.length > 2 && lastname.length > 2 && address.length > 2 && phoneNumber.length >= 9
  }

  const headers = {
    "Content-Type": "application/json"
  }

  const handleClick = () =>{
    var data = {
        'firstname': firstname,
        'lastname': lastname,
        'address': address,
        'phoneNumber': phoneNumber
    }
    axios.post(`http://localhost:8080/take/customer`, JSON.stringify(data),{headers: headers}).then(() => {setFirstname("");setLastname("");setPhoneNumber("");setAddress("");})
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" style ={{border: "1px solid #000",margin: "10px",padding: "5px"}}>
      <div>
          <h3 style = {{color: "blue"}}>Add new customer</h3>
      </div>
      <div>
        <TextField required id="standard-required" placeholder="Firstname"  onChange = {(e) => setFirstname(e.target.value)} />
        <TextField required id="standard-required" placeholder="Lastname"  onChange = {(e) => setLastname(e.target.value)} />
        <TextField required id="standard-required" placeholder="Address"  onChange = {(e) => setAddress(e.target.value)} />
        <TextField required id="standard-required" placeholder="Phone Number"  onChange = {(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div>
      <Button variant="outlined" color="primary" disabled = {!checkState()} onClick = {handleClick}>
        Save
      </Button>
      </div>
    </form>
  );
}

export {CustomerForm}