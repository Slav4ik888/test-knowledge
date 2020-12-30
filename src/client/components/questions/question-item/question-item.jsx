import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import FolderIcon from '@material-ui/icons/Folder';
// Components
import EditIconAvatar from '../../buttons/edit-icon-avatar/edit-icon-avatar';
import DeleteIconAvatar from '../../buttons/delete-icon-avatar/delete-icon-avatar';
import { typeElem } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  hover: {
    transition: `transform 0.2s`,
    backgroundColor: theme.palette.background.hover,
    borderRadius: `5px`,
    // height: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    width: `calc(100% - 100px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
    cursor: `pointer`,
  },
}));

const QuestionItem = ({ question, onEdit, onDel }) => {
  const classes = useStyles();

  const { title, id } = question;

  const [showIcons, setShowIcons] = useState(false);
  const handlePointerEnter = () => setShowIcons(true);
  const handlePointerLeave = () => setShowIcons(false);

  const hover = showIcons ? classes.hover : ``;

  const handleEdit = () => onEdit(id);
  const handleDel = () => onDel(id);

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
        <ListItemText onClick={handleEdit} className={classes.title}>
          {title}
        </ListItemText>
      </Tooltip>

      {
        showIcons &&
        <>
          <EditIconAvatar type={typeElem.QUESTION} onEdit={handleEdit} />
          <DeleteIconAvatar type={typeElem.QUESTION} onDel={handleDel} />
        </>
      }

    </ListItem>
  );
}

QuestionItem.propTypes = {
  question: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default QuestionItem;
