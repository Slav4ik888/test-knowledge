import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsListShow from '../../positions/positions-list-show/positions-list-show';
import PositionsAddDocument from '../../positions/positions-add-document/positions-add-document';


const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 70,
  },
  delIcon: {
    marginRight: 30,
  },
  hover: {
    backgroundColor: `#e9f6fc`,
  }
}));

const DocumentItem = ({ doc, onEdit, onDel}) => {
  const classes = useStyles();
  const { title, id } = doc;
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

  const [posEdit, setPosEdit] = useState(false);
  const handlePosEditOpen = () => setPosEdit(true);
  const handlePosEditClose = () => setPosEdit(false);

  const [anchorPos, setAnchorPos] = useState(null);
  const handleShowPosOpen = (e) => setAnchorPos(e.currentTarget);
  const handleShowPosClose = () => {
    setAnchorPos(null);
  };
  const openPos = Boolean(anchorPos);


  const handleDelDoc = () => onDel(id);

  return (
    <ListItem
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
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

          <ListItemSecondaryAction onClick={handleDelDoc} className={classes.delIcon}>
            <Tooltip title="Удалить" placement="bottom" arrow>
              <IconButton aria-label="Delete">
                <Delete />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>

          <ListItemSecondaryAction
            onMouseEnter={handleShowPosOpen}
            onClick={handlePosEditOpen}
          >
            <Tooltip title="Изменить список закреплённых должностей" placement="bottom" arrow>
              <IconButton edge="end" aria-label="Positions">
                <SupervisedUserCircleIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </>
      }

      <PositionsListShow
        open={openPos}
        anchorEl={anchorPos}
        onClose={handleShowPosClose}
        positions={doc.positions}
      />
      <PositionsAddDocument
        open={posEdit}
        doc={doc}
        onClose={handlePosEditClose}
      />
    </ListItem>
  );
}

DocumentItem.propTypes = {
  doc: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default DocumentItem;
