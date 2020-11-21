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
import FolderIcon from '@material-ui/icons/Folder';


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
}));

const DocumentAdd = ({ onAdd}) => {

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
    <form onSubmit={handleSubmit}>
      <Paper className={classes.formControl}>
        <Avatar>
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
        <IconButton aria-label="Add" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Paper>
    </form>
  );
}

DocumentAdd.propTypes = {
  onAdd: pt.func.isRequired,
};

export default DocumentAdd;
