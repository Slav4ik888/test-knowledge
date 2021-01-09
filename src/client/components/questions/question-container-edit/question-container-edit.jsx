import React, { useState, useRef, useEffect } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateQuestion } from '../../../redux/actions/data-actions';
import { clearErrors } from '../../../redux/actions/ui-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// Icons
import HelpIcon from '@material-ui/icons/Help';
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import AnswersList from '../answers-list/answers-list';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
// Functions
import { updateArrWithItemByField, getArrWithoutItemByField } from '../../../utils/arrays';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  question: {
    width: `100%`,
    display: 'flex',
    // alignItems: `center`,
    padding: theme.spacing(1, 4, 1, 5),
    backgroundColor: theme.palette.background.bodyfield,
  },
  avatar: {
    margin: theme.spacing(4, 3, 0, 0),
    backgroundColor: theme.palette.primary.light,
  },
  questionBox: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`,
  },
  questionBody: {
    padding: theme.spacing(2, 2, 2, 2),
    marginBottom: `16px`,
    resize: `vertical`,
    borderColor: theme.border.light,
    outline: 0,  
    width: `100%`,
    fontSize: `20px`,
  },
  // hover: {
  //   backgroundColor: theme.palette.background.sectionHover, // `#e9f6fc`,
  // },
  answerListBody: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: `180px`,
    backgroundColor: theme.palette.background.bodyfield,
  },
  action: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.moduleAddInput,
  },
}));


// Контейнер с вопросом и ответами на него, которые можно создавать и редактировать
const QuestionContainerEdit = ({ open, loading, onClose, question, updateQuestion, clearErrors }) => {
  
  if (!open) return null;
  
  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const handleClose = () => onClose();

  const listRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: listElement } = listRef;
      if (listElement !== null) {
        listElement.focus();
      }
    }
  }, [open]);

  const [newQuestion, setNewQuestion] = useState(question);
  
  const handleEditQuestion = (e) => {
    const value = e.target.value;

    if (value !== question.question) {
      const updQuestion = Object.assign({}, newQuestion);
      updQuestion.question = value;
      setIsChange(true);
      setNewQuestion(updQuestion);
    }
  };

  // Добавили новый ответ
  const handleAddAnswer = (answer) => {

    const addAnswer = {
      answer: answer.answer,
      trueAnswer: answer.trueAnswer,
      id: answer.id,
      order: answer.order,
    };
    newQuestion.answers.push(addAnswer);
    setNewQuestion(newQuestion);
    setIsChange(true);
    clearErrors();
  };

  // Редактировали ответ
  const handleEditAnswer = (answer, move) => {
    newQuestion.answers = updateArrWithItemByField(newQuestion.answers, `id`, answer);
    setNewQuestion(newQuestion);
    setIsChange(true);
    if (move) clearErrors();
  };

  // Переместили ответ
  const handleMoveAnswer = (answer) => handleDelAnswer(answer, true);

  // Удалили ответ
  const handleDelAnswer = (answer) => {
    newQuestion.answers = getArrWithoutItemByField(newQuestion.answers, `id`, answer);
    setNewQuestion(newQuestion);
    setIsChange(true);
    clearErrors();
  };

  // Нажали сохранить
  const handleSubmit = () => {
    updateQuestion(newQuestion);
    setIsChange(false);
  };

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка вопроса</DialogTitle>

        <div className={classes.question}>
          <Avatar className={classes.avatar}>
            <HelpIcon />
          </Avatar>
          <div className={classes.questionBox}>
            <Typography variant="overline">Вопрос</Typography>
            <TextareaAutosize
              className={classes.questionBody}
              placeholder="Введите текст вопроса"
              value={newQuestion.question}
              rowsMin={2}
              onChange={handleEditQuestion} 
            />
            <Typography variant="overline">Варианты ответов</Typography>
          </div>
        </div>

        <DialogContent dividers ref={listRef} className={classes.answerListBody} >
          <AnswersList
            answers={newQuestion.answers}
            onAdd={handleAddAnswer}
            onEdit={handleEditAnswer}
            onMove={handleMoveAnswer}
            onDel={handleDelAnswer}
          />
        </DialogContent>

        <DialogActions className={classes.action}>
          <CancelSubmitBtn
            onCancel={onClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

QuestionContainerEdit.propTypes = {
  open: pt.bool.isRequired,
  loading: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  question: pt.object,
  updateQuestion: pt.func.isRequired,
  clearErrors: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});

const mapActionsToProps = {
  updateQuestion, clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionContainerEdit);
