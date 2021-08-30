import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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


const useSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditRoute = ({open,setClose,parcele}) => {
    const selectClass = useSelect();
    const classes = useStyles();
    const classess = useStyless();
    const [newParceleStatus,setNewParceleStatus] = useState(parcele.parceleStatus)
    const [newRuteId,setNewRuteId] = useState(parcele.ruteId)
    const [parceleStatuses,setParceleStatuses] = useState([])
    const [ruteIds,setRuteIds] = useState([])
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const handleChange = (event) => {
      parcele.parceleStatus = event.target.value
      setNewParceleStatus(event.target.value)
    }

    const handleChangeRute = (event) => {
      parcele.ruteId = event.target.value
      setNewRuteId(event.target.value)
    }

    useEffect(()=>{
      axios.get(`http://localhost:8080/take/parcele/status`).then(res => setParceleStatuses(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
      axios.get(`http://localhost:8080/take/rute/get/Scheduling`).then(res => setRuteIds(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = () => {
      const headers = {
        "Content-Type": "application/json"
      }

      const data = {
        "parceleId": parcele.parceleId,
        "ruteId": newRuteId,
        "parceleStatus": newParceleStatus
      }
      axios.put('http://localhost:8080/take/parcele',JSON.stringify(data),{headers: headers}).then(() => setClose())
    }
    const body = (
      <div style={modalStyle} className={classes.paper}>
      <form className={classess.root} noValidate autoComplete="off" >
        <div>
            <h3 style = {{color: "blue"}}>Update customer data {parcele.parceleId}</h3>
        </div>
        <div>
        <FormControl className={selectClass.formControl}>
        <InputLabel id="demo-simple-select-label">Change parcele status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newParceleStatus}
          onChange={handleChange}
        >
          {parceleStatuses.map(p => <MenuItem value={p}>{p}</MenuItem>)}
        </Select>
        </FormControl>
        <FormControl className={selectClass.formControl}>
        <InputLabel id="demo-simple-select-label">Assign to a rute</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {newRuteId ? newRuteId : "none"}
          onChange={handleChangeRute}
        >
          {ruteIds.map(r =>  <MenuItem value={r}>{r}</MenuItem>)}
        </Select>
      </FormControl>
        </div>
        <div>
        <Button variant="outlined" color="primary" onClick = {handleClick} >
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

export {EditRoute}