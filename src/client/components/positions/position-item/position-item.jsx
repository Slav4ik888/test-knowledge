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
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Component
import DeletePositionAvatar from '../../buttons/delete-position-avatar/delete-position-avatar';

const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 40,
  },
  hover: {
    backgroundColor: `#e9f6fc`,
  },
  avatarIcon: {
    height: `34px`,
    width: `34px`,
  }
  // divider: {
  //   height: 28,
  //   margin: 4,
  //   position: `absolute`,
  //   right: 55,
  // },
}));

const PositionItem = ({ title, id, onEdit, onDel}) => {

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

  const handleDelPos = () => onDel(id);

  return (
    <ListItem
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={hover}
    >
      <ListItemAvatar>
        <Avatar>
          <SupervisedUserCircleIcon className={classes.avatarIcon}/>
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

          <DeletePositionAvatar onDel={handleDelPos} />
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
