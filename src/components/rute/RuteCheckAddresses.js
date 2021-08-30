import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { TransferList } from './TransferList'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    width: '80%',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const useTable = makeStyles({
    table: {
      minWidth: 900,
    },
  });
  
const RuteCheckAddresses = ({open,setClose,rute}) => {
  const classes = useStyles(); 
  const table = useTable()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [data,setData] = React.useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:8080/take/rute/${rute.ruteId}/fullinfo`).then((res)=>setData(res.data))
    })

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style = {{alignItems: 'center', alignSelf: 'center'}}>
        <h3> Check data of customers and addresses {rute.ruteId} </h3>
        <TableContainer component={Paper}>
      <Table className={table.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer full name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Expected delivery date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key = {1}>
              <TableCell component="th" scope="row">
                {row.clientFullName}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.expectedDeliveryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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

export {RuteCheckAddresses}