import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { TransferList } from './TransferList'

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
    width: '50%',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RuteAssignParcele = ({open,setClose,rute}) => {
  const classes = useStyles(); 
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);



  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style = {{alignItems: 'center', alignSelf: 'center'}}>
        <h3> Assign parceles to route with id {rute.ruteId} </h3>
      <TransferList rute = {rute} setClose = {setClose}></TransferList>
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

export {RuteAssignParcele}