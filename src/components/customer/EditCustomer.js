import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    textAlign: 'center'
  };
}

const useStyless = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch'
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditCustomer = ({open,setClose,customer}) => {
  const classes = useStyles();
  const classess = useStyless();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [firstname,setFirstname] = useState(customer.firstname)
  const [address,setAddress] = useState(customer.address)
  const [lastname,setLastname] = useState(customer.lastname)
  const [phoneNumber,setPhoneNumber] = useState(customer.phoneNumber)

  const handleClick = () => {
    const headers = {
      "Content-Type": "application/json"
    }
    const body = {
      "firstname": firstname,
      "lastname": lastname,
      "address": address,
      "phoneNumber": phoneNumber
    }
    axios.put(`http://localhost:8080/take/customer/${customer.id}`,JSON.stringify(body),{headers: headers})
    .then((res) => {
      customer.address = res.data.address
      customer.firstname = res.data.firstname
      customer.lastname = res.data.lastname
      customer.phoneNumber = res.data.phoneNumber
    }).finally(()=>setClose())
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
    <form className={classess.root} noValidate autoComplete="off" >
      <div>
          <h3 style = {{color: "blue"}}>Update customer data</h3>
      </div>
      <div>
        <TextField required id="standard-required" label="New firstname" defaultValue = {customer.firstname}  onChange = {(e) => setFirstname(e.target.value)} />
        <TextField required id="standard-required" label="New lastname" defaultValue = {customer.lastname} onChange = {(e) => setLastname(e.target.value)} />
        <TextField required id="standard-required" label="New address" defaultValue = {customer.address} onChange = {(e) => setAddress(e.target.value)} />
        <TextField required id="standard-required" label="New phone number" defaultValue = {customer.phoneNumber} onChange = {(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div>
      <Button variant="outlined" color="primary"  onClick = {handleClick}>
        Save
      </Button>
      </div>
    </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={setClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export {EditCustomer}