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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, mark,carStatus, vinNumber) {
  return {
    id,
    mark,
    carStatus,
    vinNumber
  };
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [rutes,setRutes] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8080/take/rute/${row.id}`).then(res => setRutes(res.data))
    console.log(rutes.data)
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
        <TableCell align="right">{row.mark}</TableCell>
        <TableCell align="right">{row.carStatus}</TableCell>
        <TableCell align="right">{row.vinNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Rutes history
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Rute Status</TableCell>
                    <TableCell align="right">Number of parceles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rutes.map(historyRow => (
                    <TableRow key={historyRow.ruteId}>
                      <TableCell component="th" scope="row">
                        {historyRow.ruteId}
                      </TableCell>
                      <TableCell align="right">{historyRow.ruteStatus}</TableCell>
                      <TableCell align="right">
                        {historyRow.numberOfParceles}
                      </TableCell>
                    </TableRow>
                  ))}
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


const CarTable = () => {
  const [cars,setCars] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/take/car').then(res => setCars(res.data.map(car => createData(car.id,car.mark,car.carStatus,car.vinNumber))))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">Mark</TableCell>
            <TableCell align="right">Car Status</TableCell>
            <TableCell align="right">Vin Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { cars.map(row =>
         <Row id = {row.id} row = {row} />
         )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {CarTable}