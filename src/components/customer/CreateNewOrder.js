import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const CreateNewOrder = ({open,setClose,customer}) => {
  const classes = useStyles();
  const classess = useStyless();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [orderDateDay,setOrderDateDay] = useState(0)
  const [orderDateMonth,setOrderDateMonth] = useState(0)
  const [orderDateYear,setOrderDateYear] = useState(0)
  const [deliveryDateDay,setDeliveryDateDay] = useState(0)
  const [deliveryDateYear,setDeliveryDateYear] = useState(0)
  const [deliveryDateMonth,setDeliveryDateMonth] = useState(0)
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [selectedDate2, setSelectedDate2] = React.useState(addDays(new Date(Date.now()),5));

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days); 
    return result;
  }

  const handleDateChangeOrderDate = (date) => {
    setSelectedDate(date)
    setSelectedDate2(addDays(date,5))
  };
  const handleClick = () => {
    setOrderDateDay(selectedDate.getDate())
    setOrderDateMonth(selectedDate.getMonth() + 1)
    setOrderDateYear(selectedDate.getYear() + 1900)
    setDeliveryDateDay(selectedDate2.getDate())
    setDeliveryDateYear(selectedDate2.getYear() + 1900)
    setDeliveryDateMonth(selectedDate2.getMonth() + 1)
    const headers = {
      "Content-Type": "application/json"
    }
    const body = {
      "customerId": customer.id,
      "orderDateDay": selectedDate.getDate(),
      "orderDateMonth": selectedDate.getMonth() + 1,
      "orderDateYear" : selectedDate.getYear() + 1900,
      "deliveryDateDay": selectedDate2.getDate(),
      "deliveryDateMonth": selectedDate2.getMonth() + 1,
      "deliveryDateYear": selectedDate2.getYear() + 1900
    }
    console.log(body)
    axios.post('http://localhost:8080/take/parcele',JSON.stringify(body),{headers: headers}).finally(()=> setClose())
    
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
          <h3 style = {{color: "blue"}}>New parcele</h3>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChangeOrderDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Expected delivery date"
          disabled = {true}
          value={selectedDate2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
      <div>
      <Button variant="outlined" color="primary"  onClick = {handleClick}>
        Save
      </Button>
      </div>
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

export {CreateNewOrder}