import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// MUI Stuff
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
// Icons
import AddIcon from '@material-ui/icons/Add';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    minWidth: 300,
    display: `flex`,
    alignItems: `center`,
  },
  input: {
    marginLeft: theme.spacing(1),
    width: `calc(100% - 120px)`,
    flex: 1,
    padding: theme.spacing(1),
  },
  avatarIcon: {
    height: `34px`,
    width: `34px`,
  }
}));

const PositionAdd = ({ onAdd}) => {

  const classes = useStyles();

  const [newPos, setNewPos] = useState(``);

  const handleEdit = (e) => {
    switch (e.keyCode) {
      case 13:
        if (newPos !== ``) {
          onAdd(newPos);
        }
        break;
    } 
    setNewPos(e.target.value);
  };

  const handleAdd = () => {
    onAdd(newPos);
    setNewPos(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

PositionAdd.propTypes = {
  onAdd: pt.func.isRequired,
};

export default PositionAdd;
