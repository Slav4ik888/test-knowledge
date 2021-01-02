import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { setErrors } from '../../../redux/actions/ui-actions';
// MUI Stuff
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
// Icons
import AddIcon from '@material-ui/icons/Add';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FolderIcon from '@material-ui/icons/Folder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Components
import { typeElem } from '../../../../types';


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
    // display: `flex`,
    // alignItems: `center`,
    // justifyContent: `center`,
  },
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    padding: theme.spacing(1, 4, 0, 12),
  },
}));

const ElementAdd = ({ type, onAdd, setErrors }) => {

  const classes = useStyles();

  let placeholder = ``;
  let label = ``;
  let general = ``;
  let icon = null;

  switch (type) {
    case typeElem.DOC:
      placeholder = `Добавить документ`;
      label = `Новый документ`;
      general = `Введите название документа`;
      icon = <FolderIcon />;
      break;
    
    case typeElem.POS:
      placeholder = `Добавить должность`;
      label = `Новая должность`;
      general = `Введите название должности`;
      icon = <SupervisedUserCircleIcon className={classes.avatarIcon}/>;
      break;
    
    case typeElem.QUESTION:
      placeholder = `Добавить вопрос`;
      label = `Новый вопрос`;
      general = `Введите вопрос`;
      icon = <HelpOutlineIcon className={classes.avatarIcon}/>;
      break;
    
    case typeElem.ANSWER:
      placeholder = `Добавить ответ`;
      label = `Новый ответ`;
      general = `Введите ответ`;
      icon = <HelpOutlineIcon className={classes.avatarIcon}/>;
      break;
    
    default: break;
  }

  const [title, setTitle] = useState(``);

  const handleEdit = (e) => {
    switch (e.keyCode) {
      case 13:
        handleAdd();
        break;
    } 
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    if (title.trim() !== ``) {
      onAdd({ title });
    } else {
      setErrors({ general });
    }
    setTitle(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Paper className={classes.formControl}>
        <Avatar>
          {icon}
        </Avatar>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ 'aria-label': label }}
          type="text"
          value={title}
          onChange={handleEdit}
        />
        <IconButton aria-label="Add" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Paper>
    </form>
  );
}

ElementAdd.propTypes = {
  type: pt.oneOf([typeElem.POS, typeElem.DOC, typeElem.QUESTION, typeElem.ANSWER]).isRequired,
  onAdd: pt.func.isRequired,
  setErrors: pt.func.isRequired,
};

const mapActionsToProps = {
  setErrors,
};

export default connect(undefined, mapActionsToProps)(ElementAdd);
