import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SettingsBackupRestoreSharp, SwapVerticalCircleSharp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch'
    },
  },
}));
const useSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const RuteForm = () => {
  const classes = useStyles();
  const select = useSelect();
  const [cars, setCars] = React.useState([]);
  const [car,setCar] = React.useState(0)

  const handleChange = (event) => {
    setCar(event.target.value);
  };

  const headers = {
    "Content-Type": "application/json"
  }

  const handleClick = () =>{
    var data = {
        'carId': car
    }
    axios.post(`http://localhost:8080/take/rute`, JSON.stringify(data),{headers: headers}).then(()=> setCar(0))
  }
  
 useEffect(() => {
      axios.get('http://localhost:8080/take/car').then(res => setCars(res.data))
  },[])

  const checkState = () =>{
      return car === -1 ? false : true
  }
  return (
    <form className={classes.root} noValidate autoComplete="off" style ={{border: "1px solid #000",margin: "10px",padding: "5px"}}>
      <div>
      <h3>Create new rute</h3>
      <FormControl className={select.formControl}>
        <InputLabel id="demo-simple-select-label">Select car</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          placeholder = "Selecet car"
          value={car}
          onChange={handleChange}
        >
        {cars.map(c => <MenuItem value={c.id}>{`${c.mark} ${c.vinNumber} ${c.carStatus}`}</MenuItem>)}
        </Select>
        </FormControl>
      </div>
      <div>
      <Button variant="outlined" color="primary" disabled = {!checkState()} onClick = {handleClick}>
        Save
      </Button>
      </div>
    </form>
  );
}

export {RuteForm}