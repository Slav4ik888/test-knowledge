import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePosition, deletePosition } from '../../../redux/actions/data-actions';
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
    backgroundColor: theme.palette.background.hover,
  },
  avatarIcon: {
    height: `34px`,
    width: `34px`,
  },
  
  // divider: {
  //   height: 28,
  //   margin: 4,
  //   position: `absolute`,
  //   right: 55,
  // },
}));

const PositionItem = ({ position, updatePosition, deletePosition}) => {

  const classes = useStyles();

  const [showIcons, setShowIcons] = useState(false);
  const handlePointerEnter = () => setShowIcons(true);
  const handlePointerLeave = () => {
    setShowIcons(false);
    handleUpdatePos();
  };
  const hover = showIcons ? classes.hover : ``;

  const [edit, setEdit] = useState(false);
  const handleSetEdit = () => setEdit(true);

  const [newTitle, setNewTitle] = useState(position.title);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      setEdit(false);
      e.target.blur();
      handleUpdatePos();
    }
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    setEdit(false);
    handleUpdatePos();
  };

  const handleUpdatePos = () => {
    if (position.title !== newTitle) {
      let newPos = position;
      newPos.title = newTitle;
      updatePosition(newPos);
    }
  };
  const handleDelPos = () => deletePosition(position);

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
            type="text" fullWidth
            value={newTitle}
            placeholder="Введите название должности"
            onChange={handleEdit} 
            onBlur={handleBlur}
            onKeyDown={handleEdit}
          />
          :
          <ListItemText primary={newTitle} onClick={handleSetEdit} />
      }
      {
        showIcons &&
        <>
          <ListItemSecondaryAction onClick={handleSetEdit} className={classes.editIcon}>
            <Tooltip title="Изменить" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
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
  position: pt.object.isRequired,
  updatePosition: pt.func.isRequired,
  deletePosition: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});

const mapActionsToProps = {
  updatePosition,
  deletePosition
};

export default connect(mapStateToProps, mapActionsToProps)(PositionItem);
