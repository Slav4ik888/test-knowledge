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
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
// Icons
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';


const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 40,
  },
  hover: {
    backgroundColor: `#e9f6fc`,
  }
  // divider: {
  //   height: 28,
  //   margin: 4,
  //   position: `absolute`,
  //   right: 55,
  // },
}));

const DocumentItem = ({ title, id, onEdit, onDel}) => {

  const classes = useStyles();
  const [showIcons, setShowIcons] = useState(false);
  const handlePointerEnter = () => setShowIcons(true);
  const handlePointerLeave = () => {
    setShowIcons(false);
    if (title !== newTitle) {
      handleBlur();
    }
  };
  const hover = showIcons ? classes.hover : ``;

  const [edit, setEdit] = useState(false);
  const handleSetEdit = () => setEdit(true);

  const [newTitle, setNewTitle] = useState(title);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      setEdit(false);
      if (title !== newTitle) {
        onEdit(id, newTitle);
      }
    }
    setNewTitle(e.target.value);
  };

  const handleFocus = () => {
  };
  const handleBlur = () => {
    setEdit(false);
    if (title !== newTitle) {
      onEdit(id, newTitle);
    }
  };

  const handleDelDoc = () => onDel(id);

  return (
    <ListItem
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={hover}
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
            onKeyDown={handleEdit}
          />
          :
          <ListItemText primary={newTitle} />
      }
      {
        showIcons &&
        <>
          <ListItemSecondaryAction onClick={handleSetEdit} className={classes.editIcon}>
            <Tooltip title="Изменить" placement="bottom" arrow>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>

          {/* <Divider className={classes.divider} orientation="vertical" /> */}

          <ListItemSecondaryAction onClick={handleDelDoc}>
            <Tooltip title="Удалить" placement="bottom" arrow>
              <IconButton edge="end" aria-label="Delete">
                <Delete />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </>
      }

    </ListItem>
  );
}

DocumentItem.propTypes = {
  title: pt.string.isRequired,
  id: pt.string.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default DocumentItem;