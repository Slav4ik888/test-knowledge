import React, {useState} from 'react';
import pt from 'prop-types';
import cl from 'classnames';
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
import UpAndDownAdd from '../../buttons/up-and-down-add/up-and-down-add';
import UpAndDownArrows from '../../buttons/up-and-down-arrows/up-and-down-arrows';
import DeleteIconAvatar from '../../buttons/delete-icon-avatar/delete-icon-avatar';
import { typeElem, typeUpDown } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `row`,
    borderRadius: `5px`,
    border: `1px solid`,
    borderColor: theme.border.answer,
  },
  hover: {
    transition: `transform 0.2s`,
    backgroundColor: theme.palette.background.hover,
    // borderRadius: `5px`,
    // height: theme.spacing(1),
  },
  sprite: {
    width: `calc(100% - 80px)`,
    display: `flex`,
    flexDirection: `row`,
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
  input: {
    width: `calc(100% - 130px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
    fontSize: `18px`,
  },
}));

const AnswerItem = ({ answers, answer, onAdd, onEdit, onDel }) => {
  const classes = useStyles();

  const [showIcons, setShowIcons] = useState(false);
  const handleIsHoverOn = () => setShowIcons(true);
  const handleIsHoverOff = () => setShowIcons(false);

  const hover = showIcons ? classes.hover : ``;

  const [newAnswer, setNewAnswer] = useState(answer);
  const handleEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      handleUpdateAnswer();
    }
    const value = e.target.value;
    const updAnswer = Object.assign({}, newAnswer);
    updAnswer.answer = value;
    setNewAnswer(updAnswer);
  };

  const handleBlur = () => handleUpdateAnswer();

  const handleUpdateAnswer = () => {
    if (newAnswer.answer !== answer.answer) {
      onEdit(newAnswer);
    }
  };

  const handleDel = () => onDel(answer);

  return (
    <>
      <UpAndDownAdd type={typeUpDown.ANSWER} onAddAnswer={onAdd} items={answers} item={answer} upDown={`up`} />

      <ListItem className={cl(classes.container, hover)}>
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
              value={newAnswer.answer}
              type="text"
              placeholder="Введите вариант ответа"
              onChange={handleEdit} 
              onKeyDown={handleEdit}
              onBlur={handleBlur}
            />
          </Tooltip>
          {
            showIcons &&
            <>
              <DeleteIconAvatar type={typeElem.ANSWER} onDel={handleDel} />
              <UpAndDownArrows type={typeUpDown.ANSWER} items={answers} item={answer} update={onEdit} />
            </>
          }
        </div>
      </ListItem>

      <UpAndDownAdd type={typeUpDown.ANSWER} onAddAnswer={onAdd} items={answers} item={answer} upDown={`down`} />
    </>
  );
}

AnswerItem.propTypes = {
  answers: pt.array.isRequired,
  answer: pt.object.isRequired,
  onAdd: pt.func.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
};

export default AnswerItem;
