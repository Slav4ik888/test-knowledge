import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Component
import PositionItem from '../position-item/position-item';

const useStyles = makeStyles((theme) => ({
  list: {
    width: `100%`,
  },
}));
const PositionsListItem = ({ positions }) => {
  if (!positions) return null;

  const classes = useStyles();

  return (
    <List height={200} className={classes.list}>
      {
        positions.map((pos) => <PositionItem key={pos.id} position={pos} />)
      }
    </List> 
  );
}

PositionsListItem.propTypes = {
  positions: pt.array.isRequired,
};

export default PositionsListItem;
