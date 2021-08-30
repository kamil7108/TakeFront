import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { EditCustomer } from './EditCustomer';
import { CreateNewOrder } from './CreateNewOrder';
import { EditRoute } from './EditParcele';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id,firstname, lastname,address,phoneNumber) {
  return {
    id,
    address,
    firstname,
    lastname,
    phoneNumber
  };
}


function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles();
  const [parceles,setParceles] = useState([])
  const [editModal,setEditModal] = useState(false)
  const [createModal,setCreateModal] = useState(false)
  const [editRoute,setEditRoute] = useState(false)
  const [par,setPar] = useState(parceles[0]);
  const handleOpenEditModal = () => {
    setEditModal(true)
  };
  const handleCloseEditModal = () => {
    setEditModal(false)
  }
  const handleOpenNewOrder = () => {
    setCreateModal(true)
  }
  const handleCloseNewOrder = () => {
    setCreateModal(false)
  }
  const handleOpenEditRoute = (parcele) => {
    setEditRoute(true)
    console.log(parcele)
    setPar(parcele)
  }
  const handleCloseEditRoute = () => {
    setEditRoute(false)
  }
  useEffect(()=>{
    axios.get(`http://localhost:8080/take/parcele/${row.id}`).then(res => setParceles(res.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> 
          {row.id}
        </TableCell>
        <TableCell align="right">{row.firstname}</TableCell>
        <TableCell align="right">{row.lastname}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
        <TableCell align="right">
                          <Button onClick = {handleOpenEditModal}>Update</Button>
                          {editModal ? <EditCustomer open = {editModal} setClose = {handleCloseEditModal} customer = {row}></EditCustomer> : ""}
                          <Button onClick = {handleOpenNewOrder}>New order</Button>
                          {createModal ? <CreateNewOrder open = {createModal} setClose = {handleCloseNewOrder} customer = {row} ></CreateNewOrder> : ""}
         </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Customer Parceles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Order Date</TableCell>
                    <TableCell align="right">Delivery Date</TableCell>
                    <TableCell align="right">Parcele Status</TableCell>
                    <TableCell align="right">Rute Id</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {parceles.map(parcele => (
                    <TableRow key={parcele.parceleId}>
                      <TableCell component="th" scope="row">
                        {parcele.parceleId}
                      </TableCell>
                      <TableCell align="right">{`${parcele.orderDateDay}-${parcele.orderDateMonth}-${parcele.orderDateYear}`}</TableCell>
                      <TableCell align="right">{`${parcele.deliveryDateDay}-${parcele.deliveryDateMonth}-${parcele.deliveryDateYear}`}</TableCell>
                      <TableCell align="right">
                        {parcele.parceleStatus}
                      </TableCell>
                      <TableCell align="right">
                        {parcele.ruteId}
                      </TableCell>
                      <TableCell>
                        <Button  value = {parcele} onClick = {() => handleOpenEditRoute(parcele)}>Update</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                   {editRoute ? <EditRoute open = {editRoute} setClose = {handleCloseEditRoute} parcele = {par}></EditRoute> : "" }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
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


const CustomerTable = () => {
  const [customer,setCustomers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/take/customer').then(res => setCustomers(res.data.map(customer => createData(customer.id,customer.firstname,customer.lastname,customer.address,customer.phoneNumber))))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">Firstname</TableCell>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { customer.map(row =>
         <Row id = {row.id} row = {row} />
         )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {CustomerTable}