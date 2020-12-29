import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
// Icons
import FolderIcon from '@material-ui/icons/Folder';
// Components
import PositionsIconShow from '../../positions/positions-icon-show/positions-icon-show';
import DeleteDocumentAvatar from '../../buttons/delete-document-avatar/delete-document-avatar';
import { typeElem } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  hover: {
    transition: `transform 0.2s`,
    backgroundColor: theme.palette.background.hover,
    borderRadius: `5px`,
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

const DocumentItem = ({ doc, onEdit, onDel }) => {
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

  const [newTitle, setNewTitle] = useState(title);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      if (title !== newTitle) {
        onEdit(id, newTitle);
      }
    }
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== newTitle) {
      onEdit(id, newTitle);
    }
  };

  const handleDelDoc = () => onDel(id);

  return (
    <ListItem
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      className={hover}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>

      <Tooltip title="Нажмите для редактирования" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
        <InputBase
          className={classes.input}
          inputProps={{ 'aria-label': 'Документ' }}
          value={newTitle}
          type="text"
          placeholder="Введите название документа"
          onChange={handleEdit}
          onBlur={handleBlur}
          onKeyDown={handleEdit}
        />
      </Tooltip>
      
      {
        showIcons &&
        <>
          <DeleteDocumentAvatar onDel={handleDelDoc} title={`документ`} />
          <PositionsIconShow type={typeElem.DOC} item={doc} />
        </>
      }

    </ListItem>
  );
}

DocumentItem.propTypes = {
  doc: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default DocumentItem;
