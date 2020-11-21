import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePositions, updatePositionsServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
// Component
import PositionsList from '../positions-list/positions-list';
import PositionAdd from '../position-add/position-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


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
  updatePositions, updatePositionsServer }) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  console.log(positions);
  
  const handleEditPos = (id, newTitle) => {
    let newPositions = [...positions];
    const idx = positions.findIndex((pos) => pos.id === id);
    newPositions[idx].title = newTitle;
    updatePositions(newPositions);
  };

  const handleDelPos = (id) => {
    console.log(`handleDelPos id: `, id);
    const idx = positions.findIndex((pos) => pos.id === id);
    let newPositions = [...positions.slice(0, idx), ...positions.slice(idx + 1)];
    updatePositionsServer(newPositions);
  };

  const handleAddPos = (title) => {
    if (title.trim()) {
      const newPos = {
        title,
        id: createId(positions),
        order: getMaxOrder(positions),
      }
      let newPositions = [newPos, ...positions];
      updatePositions(newPositions);
    }
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePositionsServer(positions);
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
            <PositionsList
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
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Сохранить
            {
              loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PositionsContainer.propTypes = {
  updatePositions: pt.func.isRequired,
  updatePositionsServer: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
});

export default connect(mapStateToProps, {updatePositions, updatePositionsServer})(PositionsContainer);
