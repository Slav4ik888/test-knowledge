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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';


const useStyles = makeStyles((theme) => ({
  sectionAdd: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
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
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
}));

const SectionAdd = ({ onAdd, UI: { errors } }) => {
  const classes = useStyles();

  const [newSection, setNewSection] = useState(``);
  const handleEdit = (e) => {
    switch (e.keyCode) {
      case 13:
        if (newSection !== ``) {
          onAdd(newSection);
        }
        break;
    } 
    setNewSection(e.target.value);
  };

  const handleAdd = () => {
    onAdd(newSection);
    setNewSection(``);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <div className={classes.sectionAdd}>   
      <form onSubmit={handleSubmit}>
        <Paper className={classes.formControl}>
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
          <InputBase
            className={classes.input}
            placeholder="Добавить раздел"
            inputProps={{ 'aria-label': 'Новый раздел' }}
            type="text"
            value={newSection}
            onChange={handleEdit}
          />
          <IconButton aria-label="Add" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Paper>
      </form>

      {
        errors.general && (
          <Typography variant="body2" className={classes.customError}>
            {errors.general}
          </Typography>
        )
      }

    </div>
  );
}

SectionAdd.propTypes = {
  onAdd: pt.func.isRequired,
  UI: pt.object.isRequired,
};

export default SectionAdd;
