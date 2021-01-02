import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
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
  input: {
    width: `calc(100% - 130px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
    fontSize: `25px`,
  },
}));

const AnswerItem = ({ answer: { answer, id }, onEdit, onDel }) => {
  const classes = useStyles();

  const [showIcons, setShowIcons] = useState(false);
  const handleIsHoverOn = () => setShowIcons(true);
  const handleIsHoverOff = () => setShowIcons(false);

  const hover = showIcons ? classes.hover : ``;

  const [newTitle, setNewTitle] = useState(answer);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      handleUpdateAnswer();
    }
    const value = e.target.value;
    setNewTitle(value);
  };

  const handleBlur = () => handleUpdateAnswer();

  const handleUpdateAnswer = () => {
    if (newTitle !== answer) {
      console.log(`Есть изменения, обновляем ответ`);
      // updateRule(rule);
    }
  };

  // const handleEdit = () => onEdit(id);
  const handleDel = () => onDel(id);

  return (
    <ListItem className={hover}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>

      <div className={classes.sprite} onMouseEnter={handleIsHoverOn} onMouseLeave={handleIsHoverOff}>
        <Tooltip title="Нажмите, чтобы изменить заголовок ответа" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
          <InputBase
            className={classes.input}
            inputProps={{ 'aria-label': 'Заголовок ответа' }}
            value={newTitle}
            type="text"
            placeholder="Введите заголовок ответа"
            onChange={handleEdit} 
            onKeyDown={handleEdit}
            onBlur={handleBlur}
          />
        </Tooltip>
        {
          showIcons &&
          <>
            <EditIconAvatar type={typeElem.ANSWER} onEdit={handleEdit} />
            <DeleteIconAvatar type={typeElem.ANSWER} onDel={handleDel} />
          </>
        }
      </div>
    </ListItem>
  );
}

AnswerItem.propTypes = {
  answer: pt.object.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default AnswerItem;