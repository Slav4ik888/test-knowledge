import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePositions } from '../../../redux/actions/data-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
// Component
import PositionsList from '../positions-list/positions-list';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: `calc(100% - 60px)`,
    flex: 1,
    padding: theme.spacing(1),
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
  formControl: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    minWidth: 300,
  },
}));

const PositionsContainer = ({ open, onClose, UI: { loading, errors, messages }, positions, updatePositions}) => {

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
  };

  const [newPos, setNewPos] = useState(``);
  const handleChangeAddPos = (e) => {
    console.log('e.target.value: ', e.target.value);
    setNewPos(e.target.value);
  };
  const handleAddPos = () => {
    console.log(`new position: `, newPos);
    setNewPos(``);
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addUser(email);
  };

  return (
    <>
      <Dialog disableBackdropClick disableEscapeKeyDown className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle>Настройки</DialogTitle>
        <DialogContent>
          <PositionsList
            positions={positions}
            onEdit={handleEditPos}
            onDel={handleDelPos}
          />

          <Paper component="form" className={classes.formControl}>
            <InputBase
              className={classes.input}
              placeholder="Добавить должность"
              inputProps={{ 'aria-label': 'новая должность' }}
              type="text"
              value={newPos}
              onChange={handleChangeAddPos}
            />
            <IconButton edge="end" aria-label="Add" onClick={handleAddPos}>
              <AddIcon />
            </IconButton>
          </Paper>
          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }
        </DialogContent>
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
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
});

export default connect(mapStateToProps, {updatePositions})(PositionsContainer);
