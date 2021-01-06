import React, {useState} from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// Icons
import HelpIcon from '@material-ui/icons/Help';
// Components
import AddIconRow from '../../buttons/add-icon-row/add-icon-row';
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
    // padding: theme.spacing(1, 3, 1, 3),
    fontSize: `18px`,
  },
  answer: {
    padding: theme.spacing(2),
    flex: 1,
    resize: `vertical`,
    border: `none`,
    // borderColor: theme.border.light,
    outline: 0,  
    width: `calc(100% - 130px)`,
    fontSize: `18px`,
    backgroundColor: `inherit`,
    // backgroundColor: theme.palette.background.bodyfield,
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
      return;
    }

    const name = e.target.name;
    const value = e.target.value;
    const updAnswer = Object.assign({}, newAnswer);

    if (name === `answer`) { // Если изменили ответ
      updAnswer.answer = value;

    } else if (name === `valid-ans-${answer.id}`) { // Если переключили тумблер
      updAnswer.trueAnswer = !newAnswer.trueAnswer;
    }
    // onEdit(updAnswer);
    setNewAnswer(updAnswer);
    handleUpdateAnswer(updAnswer);
  };

  const handleBlur = () => handleUpdateAnswer();

  const handleUpdateAnswer = (getAnswer) => {
    const updAnswer = getAnswer ? getAnswer : newAnswer;

    if (updAnswer.answer !== answer.answer || updAnswer.trueAnswer !== answer.trueAnswer) {
      onEdit(updAnswer);
    }
  };

  const handleDel = () => onDel(answer);

  return (
    <>
      <form onSubmit={() => {}}>
        <ListItem className={cl(classes.container, hover)}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <HelpIcon />
            </Avatar>
          </ListItemAvatar>

          <div className={classes.sprite} onMouseEnter={handleIsHoverOn} onMouseLeave={handleIsHoverOff}>
            <Tooltip title="Нажмите, чтобы изменить заголовок ответа" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
              {/* <InputBase
                className={classes.input}
                inputProps={{ 'aria-label': 'Заголовок ответа' }}
                value={newAnswer.answer}
                type="text"
                name="answer"
                placeholder="Введите вариант ответа"
                onChange={handleEdit} 
                onKeyDown={handleEdit}
                onBlur={handleBlur}
              /> */}
            <TextareaAutosize
              className={classes.answer}
              placeholder="Введите вариант ответа"
              value={newAnswer.answer}
              name="answer"
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
              
          <Switch
            checked={newAnswer.trueAnswer}
            onChange={handleEdit}
            color="primary"
            name={`valid-ans-${answer.id}`}
          />

        </ListItem>
      </form>

      <AddIconRow type={typeElem.ANSWER} onAddAnswer={onAdd} items={answers} item={answer} />
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
