import React, {useRef, useEffect, useState} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePositions, updatePositionsServer, delPositionServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Components
import PositionsListItem from '../positions-list-item/positions-list-item';
import PositionAdd from '../position-add/position-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  iconButton: {
    padding: 10,
  },
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  possitionAdd: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const PositionsContainer = ({ open, onClose, UI: { loading, errors, messages }, positions,
  updatePositions, updatePositionsServer, delPositionServer }) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);
  
  const handleEditPos = (id, newTitle) => {
    let newPositions = [...positions];
    const idx = positions.findIndex((pos) => pos.id === id);
    newPositions[idx].title = newTitle;
    setIsChange(true);
    updatePositions(newPositions);
  };

  const handleDelPos = (id) => {
    setIsChange(false);
    delPositionServer({ id });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChange(true);
    updatePositionsServer(positions);
    handleClose();
  };

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
        <DialogContent dividers ref={listRef} >
          <PositionsListItem
            open={open}
            positions={positions}
            onEdit={handleEditPos}
            onDel={handleDelPos}
          />
        </DialogContent>

        <div className={classes.possitionAdd}>
          <PositionAdd onAdd={handleAddPos} />

          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }

        </div>

        <DialogActions className={classes.dialog}>
          <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

PositionsContainer.propTypes = {
  updatePositions: pt.func.isRequired,
  updatePositionsServer: pt.func.isRequired,
  delPositionServer: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
});

export default connect(mapStateToProps, {updatePositions, updatePositionsServer, delPositionServer})(PositionsContainer);
