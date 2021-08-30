import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { RuteAssignParcele } from './RuteAssignParcele';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { RuteCheckAddresses } from './RuteCheckAddresses';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(ruteId, carId,ruteStatus,numberOfParceles) {
  return {
    ruteId,
    carId,
    ruteStatus,
    numberOfParceles
  };
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const classes = useRowStyles();
  const [update,setUpdate] = useState(0);
  const [modal,setModal] = useState(false)
  const [modal2,setModal2] = useState(false)
  const [msg,setMsg] = useState("");
  const updateStatus = () => {
    axios.put(`http://localhost:8080/take/rute/ruteStatus/${row.ruteId}/${row.carId}`).then(res => {
        row.ruteStatus = res.data.ruteStatus
        setMsg(res.data.msg)
        setUpdate(update+1)
  })}
  
  const labelButton = () =>{
    if(row.ruteStatus === "Scheduling")
        return "Start rute"
    if(row.ruteStatus === "InProgress")
        return "End rute"
    if(row.ruteStatus === "Ended")
        return "Rute ended"
  }
  const openModal = () => {
      setModal(true)
  }
  const openModal2 = () => {
    setModal2(true)
}
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ruteId}
        </TableCell>
        <TableCell align="right">{row.carId}</TableCell>
        <TableCell align="right">{row.ruteStatus}</TableCell>
        <TableCell align="right">{row.numberOfParceles}</TableCell>
        <TableCell align="right">
          <Button variant="contained" color="primary" onClick = {openModal2}>
                Addresses
            </Button>
        </TableCell>
        <TableCell align="right">
            <Button variant="contained" color="primary" disabled = {row.ruteStatus === "Ended" ? true : false} onClick = {updateStatus}>
                {labelButton()}
             </Button>
             <h3 style = {{color: "red"}}>{msg}</h3>
             <Button variant="contained" color="primary" onClick = {openModal} disabled = {row.ruteStatus !== "Scheduling"}>
                Assign Parceles
             </Button>
        </TableCell>
      <RuteAssignParcele open = {modal} setClose = {() => setModal(false)} rute = {row}></RuteAssignParcele>
      <RuteCheckAddresses open = {modal2} setClose = {() => setModal2(false)} rute = {row}></RuteCheckAddresses>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


const RuteTable = () => {
  const [rutes,setRutes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/take/rute').then(res => setRutes(res.data.map(rute => createData(rute.ruteId,rute.carId,rute.ruteStatus,rute.numberOfParceles))))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rutes])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">Car Id</TableCell>
            <TableCell align="right">Rute Status</TableCell>
            <TableCell align="right">Number of parceles</TableCell>
            <TableCell align="right"> 
              Check Addresess
             </TableCell>
            <TableCell align="right">Operations </TableCell>
          </TableRow>
         
        </TableHead>
        <TableBody>
        { rutes.map(row =>
         <Row id = {row.ruteId} row = {row} />
         )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {RuteTable}