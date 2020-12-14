import React, {useState} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePosition, deletePosition } from '../../../redux/actions/data-actions';
// MUI Stuff
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
// Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Component
import DeletePositionAvatar from '../../buttons/delete-position-avatar/delete-position-avatar';

const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 40,
  },
  hover: {
    transition: `transform 0.2s`,
    backgroundColor: theme.palette.background.hover,
    borderRadius: `5px`,
  },
  avatarIcon: {
    height: `34px`,
    width: `34px`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  input: {
    width: `calc(100% - 100px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
  },
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

  const [newTitle, setNewTitle] = useState(position.title);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      handleUpdatePos();
    }
    setNewTitle(e.target.value);
  };

  const handleBlur = () => handleUpdatePos();

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
        <Avatar className={classes.avatar}>
          <SupervisedUserCircleIcon className={classes.avatarIcon}/>
        </Avatar>
      </ListItemAvatar>

      <Tooltip title="Нажмите для редактирования" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
        <InputBase
          className={classes.input}
          inputProps={{ 'aria-label': 'Должность' }}
          value={newTitle}
          type="text"
          placeholder="Введите название должности"
          onChange={handleEdit} 
          onBlur={handleBlur}
          onKeyDown={handleEdit}
        />
      </Tooltip>

      {
        showIcons && <DeletePositionAvatar onDel={handleDelPos} />
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
