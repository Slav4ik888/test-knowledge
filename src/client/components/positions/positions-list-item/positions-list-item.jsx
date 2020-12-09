import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import List from '@material-ui/core/List';
// Component
import PositionItem from '../position-item/position-item';


const PositionsListItem = ({ positions }) => {
  if (!positions) return null;

  return (
    <List height={200}>
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
