import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
// Components
import PositionsListChip from '../positions-list-chip/positions-list-chip';


const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 70,
  },
  delIcon: {
    marginRight: 30,
  },
  hover: {
    backgroundColor: `#e9f6fc`,
  },
  popover: {
    pointerEvents: 'none',
  },
}));


const PositionsPopoverShow = ({ open, anchorEl, positions, onClose }) => {
  const classes = useStyles();

  return (
    <>
      <Popover 
        open={open}
        className={classes.popover}
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
        disableRestoreFocus
      >
        <PositionsListChip positions={positions} />
      </Popover>
      
    </>
  );
}

PositionsPopoverShow.propTypes = {
  // open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  positions: pt.array.isRequired,
};

export default PositionsPopoverShow;
