import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import List from '@material-ui/core/List';
// Component
import PositionItem from '../position-item/position-item';


const PositionsListItem = ({ positions, onEdit, onDel }) => {

  if (!positions) {
    return null;
  }

  return (
    <>
      <List height={200}>
        {positions.map((pos) => <PositionItem key={pos.id}
            title={pos.title}
            id={pos.id}
            onEdit={onEdit}
            onDel={onDel}
          />)
        }
      </List> 
    </>
  );
}

PositionsListItem.propTypes = {
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  positions: pt.array.isRequired,
};

export default PositionsListItem;
