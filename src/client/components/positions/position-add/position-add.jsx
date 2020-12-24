import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { createPosition } from '../../../redux/actions/data-actions';
import { setErrors } from '../../../redux/actions/ui-actions';
// MUI Stuff
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Icons
import AddIcon from '@material-ui/icons/Add';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';


const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: theme.palette.background.moduleAddInput,
  },
  formControl: {
    margin: theme.spacing(3, 3, 4, 3),
    padding: theme.spacing(1.5, 4, 1.5, 2),
    minWidth: 300,
    display: `flex`,
    alignItems: `center`,
    backgroundColor: theme.palette.background.moduleAdd,

  },
  input: {
    margin: theme.spacing(0, 2, 0, 2),
    width: `calc(100% - 100px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
    backgroundColor: theme.palette.background.moduleAddInput,
    borderRadius: `10px`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  avatarIcon: {
    height: `34px`,
    width: `34px`,
  },
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    padding: theme.spacing(1, 4, 0, 12),
  },
}));

const PositionAdd = ({ createPosition, setErrors, UI: { errors, loading } }) => {

  const classes = useStyles();

  const [newPos, setNewPos] = useState(``);

  const handleEdit = (e) => {
    switch (e.keyCode) {
      case 13:
        handleAdd();
        break;
    } 
    setNewPos(e.target.value);
  };

  const handleAdd = () => {
    if (newPos !== ``) {
      const newPosition = { title: newPos };
      createPosition(newPosition);
    } else {
      setErrors({ general: `Введите название должности` });
    }
    setNewPos(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.formControl}>
        <Avatar>
          <SupervisedUserCircleIcon className={classes.avatarIcon}/>
        </Avatar>
        <InputBase
          className={classes.input}
          placeholder="Добавить должность"
          inputProps={{ 'aria-label': 'Новая должность' }}
          type="text"
          value={newPos}
          onChange={handleEdit}
        />
        <IconButton aria-label="Add" onClick={handleAdd}>
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

    </form>
  );
}

PositionAdd.propTypes = {
  createPosition: pt.func.isRequired,
  setErrors: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
  createPosition: pt.func.isRequired,
});

const mapActionsToProps = {
  createPosition,
  setErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(PositionAdd);
