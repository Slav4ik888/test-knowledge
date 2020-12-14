import React, {useRef, useEffect} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../../server/utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// Components
import PositionsListItem from '../positions-list-item/positions-list-item';
import PositionAdd from '../position-add/position-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.bodyfield,
  },
}));


const PositionsContainer = ({ open, onClose, UI: { loading, errors, messages }, positions }) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();

  const handleAddPos = (title) => {
    if (title.trim()) {
      const newPos = {
        title,
        id: createId(positions),
        order: getMaxOrder(positions),
      }
      let newPositions = [newPos, ...positions];
      setIsChange(true);
      updatePositions(newPositions);
    }
  };

  const handleClose = () => onClose();

  const listRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: listElement } = listRef;
      if (listElement !== null) {
        listElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка должностей</DialogTitle>

        <DialogContent dividers ref={listRef} className={classes.container} >
          <PositionsListItem positions={positions} />
        </DialogContent>

        <PositionAdd onAdd={handleAddPos} />
        
      </Dialog>
    </>
  );
}

PositionsContainer.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
});

export default connect(mapStateToProps)(PositionsContainer);
