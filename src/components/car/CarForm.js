import React, { useState, useEffect } from 'react';
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

const CarForm = () => {
  const classes = useStyles();
  const [mark,setMark] = useState("")
  const [vin,setVin] = useState("")

  const checkState = () => {
    return mark.length > 2 && vin.length > 4
  }

  const headers = {
    "Content-Type": "application/json"
  }

  const handleClick = (() =>{
    var data = {
        'mark': mark,
        'vinNumber': vin
    }
    axios.post(`http://localhost:8080/take/car`, JSON.stringify(data),{headers: headers}).finally(()=>{
      setMark("")
       setVin("")
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <form className={classes.root} noValidate autoComplete="off" style ={{border: "1px solid #000",margin: "10px",padding: "5px"}}>
      <div>
          <h3 style = {{color: "blue"}}>Create new car</h3>
      </div>
      <div>
        <TextField required id="standard-required" label="Mark" defaultValue="Mark" onChange = {(e) => setMark(e.target.value)} />
        <TextField required id="standard-required" label="Vin Number" defaultValue="Vin Number" onChange = {(e) => setVin(e.target.value)} />
      </div>
      <div>
      <Button variant="outlined" color="primary" disabled = {!checkState()} onClick = {handleClick}>
        Add
      </Button>
      </div>
    </form>
  );
}

export {CarForm}