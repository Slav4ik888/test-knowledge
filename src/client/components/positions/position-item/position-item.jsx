import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// MUI Stuff
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
// Icons
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
// Component


const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 60,
  },
  divider: {
    height: 28,
    margin: 4,
    position: `absolute`,
    right: 55,
  },
}));

const PositionItem = ({ title, id, onEdit, onDel}) => {

  const classes = useStyles();
  const handleClose = () => onClose();

  const [edit, setEdit] = useState(false);
  const handleSetEdit = () => setEdit(true);

  const [newTitle, setNewTitle] = useState(title);
  const handleEdit = (e) => {
    setNewTitle(e.target.value);
  };

  const handleFocus = () => {
  };
  const handleBlur = () => {
    setEdit(false);
    if (title !== newTitle) {
      console.log('newTitle: ', newTitle);
      console.log('title: ', title);
      onEdit(id, newTitle);
    }
  };

  const handleEditSubmit = (e) => {
    onEdit(newTitle);
  };

  const [showIcons, setShowIcons] = useState(false);
  const handlePointerEnter = () => setShowIcons(true);
  const handlePointerLeave = () => {
    setShowIcons(false);
    if (title !== newTitle) {
      console.log(2);
      handleBlur();
    }
  };

  const handleDelPos = () => onDel(id);

  return (
    <ListItem
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      {
        edit ?
          <TextField
            name={id} type="text" className={classes.textField}
            value={newTitle} onChange={handleEdit} fullWidth
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          :
          <ListItemText primary={newTitle} />
      }
      {
        showIcons &&
        <>
          <ListItemSecondaryAction onClick={handleSetEdit} className={classes.editIcon}>
            <IconButton aria-label="Edit">
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>

          <Divider className={classes.divider} orientation="vertical" />

          <ListItemSecondaryAction onClick={handleDelPos}>
            <IconButton edge="end" aria-label="Delete">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      }

    </ListItem>
  );
}

PositionItem.propTypes = {
  title: pt.string.isRequired,
  id: pt.string.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default PositionItem;
