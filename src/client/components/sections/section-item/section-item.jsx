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
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import DeleteDocumentAvatar from '../../buttons/delete-document-avatar/delete-document-avatar';


const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 70,
  },
  hover: {
    backgroundColor: theme.palette.background.hover, // `#e9f6fc`,
  },
}));

const SectionItem = ({ section, onEdit, onDel}) => {
  const classes = useStyles();

  const { title, id } = section;
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

  const handleDelSection = () => onDel(id);

  return (
    <ListItem
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      className={hover}
    >
      <ListItemAvatar>
        <Avatar>
          <InsertDriveFileIcon />
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

          <DeleteDocumentAvatar onDel={handleDelSection} title={`раздел`} />
        </>
      }

    </ListItem>
  );
}

SectionItem.propTypes = {
  section: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default SectionItem;
