import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
// Icons
import FolderIcon from '@material-ui/icons/Folder';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsPopoverShow from '../../positions/positions-popover-show/positions-popover-show';
import PositionsAddInItem from '../../positions/positions-add-in-item/positions-add-item';
import DeleteDocumentAvatar from '../../buttons/delete-document-avatar/delete-document-avatar';
import { typePosModule } from '../../../../types';
import { getPositionsByDocId } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  editIcon: {
    marginRight: 70,
  },
  hover: {
    transition: `transform 0.2s`,
    backgroundColor: theme.palette.background.hover,
    borderRadius: `5px`,
  },
  textField: {

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

const DocumentItem = ({ doc, onEdit, onDel, positions}) => {
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

          <ListItemSecondaryAction
            onMouseEnter={handleShowPosOpen}
            onMouseLeave={handleShowPosClose}
            onClick={handlePosEditOpen}
          >
            <Tooltip title="Изменить список закреплённых должностей" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
              <IconButton edge="end" aria-label="Positions">
                <SupervisedUserCircleIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </>
      }

      <PositionsPopoverShow
        open={openPos}
        anchorEl={anchorPos}
        onClose={handleShowPosClose}
        positions={getPositionsByDocId(doc.id, positions)}
      />
      <PositionsAddInItem
        open={posEdit}
        type={typePosModule.DOC}
        item={doc}
        onClose={handlePosEditClose}
      />
    </ListItem>
  );
}

DocumentItem.propTypes = {
  doc: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
});

export default connect(mapStateToProps)(DocumentItem);
