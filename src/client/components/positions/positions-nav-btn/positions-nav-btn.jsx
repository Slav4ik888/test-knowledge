import React, { useState } from 'react';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsContainer from '../positions-container/positions-container';


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));


const PositionsNavBtn = () => {
  const classes = useStyles();
  const [isPositions, setIsPositions] = useState(false);
  const handlePositionsOpen = () => setIsPositions(true);
  const handlePositionsClose = () => setIsPositions(false);


  return (
    <>
      <ListItem button onClick={handlePositionsOpen} className={classes.button}>
        <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
        <ListItemText primary="ДОЛЖНОСТИ" />
      </ListItem>
        
      <PositionsContainer
        open={isPositions}
        onClose={handlePositionsClose}
      />
    </>
  )
};

export default PositionsNavBtn;