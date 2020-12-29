import React, {useRef, useEffect} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { createPosition } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// Components
import PositionsListItem from '../positions-list-item/positions-list-item';
import ElementAdd from '../../buttons/element-add/element-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import { typeElem } from '../../../../types';


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


const PositionsContainer = ({ open, onClose, positions, createPosition }) => {
  if (!open) return null;

  const classes = useStyles();

  const handleAdd = (titleObj) => createPosition(titleObj);

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

        <ElementAdd type={typeElem.POS} onAdd={handleAdd} />
        
      </Dialog>
    </>
  );
}

PositionsContainer.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  positions: pt.array.isRequired,
  createPosition: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
});

const mapActionsToProps = {
  createPosition,
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsContainer);
