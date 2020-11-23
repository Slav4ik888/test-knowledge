import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import Popover from '@material-ui/core/Popover';
// Components
import PositionsListChip from '../positions-list-chip/positions-list-chip';


const PositionsPopoverShow = ({ open, anchorEl, positions, onClose }) => {

  return (
    <>
      <Popover 
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PositionsListChip positions={positions} />
      </Popover>
      
    </>
  );
}

PositionsPopoverShow.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  positions: pt.array.isRequired,
};

export default PositionsPopoverShow;
