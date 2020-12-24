import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// MUI Stuff
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// Icons
import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';


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
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
}));

const DocumentAdd = ({ onAdd, UI: { errors } }) => {

  const classes = useStyles();

  const [newDoc, setNewDoc] = useState(``);

  const handleEdit = (e) => {
    switch (e.keyCode) {
      case 13:
        if (newDoc !== ``) {
          onAdd(newDoc);
        }
        break;
    } 
    setNewDoc(e.target.value);
  };

  const handleAdd = () => {
    onAdd(newDoc);
    setNewDoc(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Paper className={classes.formControl}>
          <Avatar className={classes.avatar}>
            <FolderIcon />
          </Avatar>
          <InputBase
            className={classes.input}
            placeholder="Добавить документ"
            inputProps={{ 'aria-label': 'Новый документ' }}
            type="text"
            value={newDoc}
            onChange={handleEdit}
          />
          <IconButton aria-label="Add" onClick={handleAdd} >
            <AddIcon />
          </IconButton>
        </Paper>
      </form>

      {/* {
        errors.general && (
          <Typography variant="body2" className={classes.customError}>
            {errors.general}
          </Typography>
        )
      } */}

    </>
  );
}

DocumentAdd.propTypes = {
  onAdd: pt.func.isRequired,
  UI: pt.object.isRequired,
};

export default DocumentAdd;
