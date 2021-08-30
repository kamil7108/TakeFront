import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 350,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function TransferList({rute,setClose}) { 
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([{id: 1, address: 'mock'},{id: 2, address: 'mock 2'}]);
  const [right, setRight] = React.useState([{id: 1, address: 'mock'},{id: 2, address: 'mock 2'}]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  let index = -1;
  const getIndex = () => {
      return index++
  }
  useEffect(() => {
     axios.get('http://localhost:8080/take/parcele/free').then(res => {
        setLeft(res.data.map(p => {
            return {
                id: getIndex(),
                parceleId: p.id,
                address: p.address
            }
        }))
        
  })},[])

  useEffect(() => {
      axios.get(`http://localhost:8080/take/parcele/rute/${rute.ruteId}`).then(res => {
        setRight(res.data.map(p => {
            return {
                id: getIndex(),
                parceleId: p.id,
                address: p.address
            }
        }))
  })},[])

  const handleSendRight = (parcele) => 
  {
    const headers = {
      "Content-Type": "application/json"
    }
    const body = {
      'parceleId': parcele.parceleId,
      'ruteId': rute.ruteId
    }
    axios.put(`http://localhost:8080/take/parcele`,body,{headers: headers} ).then(()=>setClose())
  }
  const handleSendLeft = (parcele) => 
  {
    const headers = {
      "Content-Type": "application/json"
    }
    const body = {
      'parceleId': parcele.parceleId,
      'ruteId': -1
    }
    axios.put(`http://localhost:8080/take/parcele`,body,{headers: headers} ).then(()=>setClose())
  }
  const handleSave = () => {
    right.forEach(handleSendRight)
    left.forEach(handleSendLeft)
  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.id + 1}| ${value.address}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
      <Button variant="contained" color="primary"  onClick ={handleSave}>
                Save
      </Button>
    </Grid>
  );
}

export {TransferList}