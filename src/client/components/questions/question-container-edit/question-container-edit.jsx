import React, { useState, useRef, useEffect } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateQuestion } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import AnswersList from '../answers-list/answers-list';
import ElementAdd from '../../buttons/element-add/element-add';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
// Functions
import { typeElem, typeQuestions } from '../../../../types';
import { getMaxOrder } from '../../../../server/utils/utils';
import { getQuestionsFromRuleId, sortingArr } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  question: {
    width: `100%`,
    display: 'flex',
    alignItems: `center`,
    padding: theme.spacing(1, 2, 1, 2),
    backgroundColor: theme.palette.background.bodyfield,
  },
  avatar: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
  },
  questionBox: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`,
  },
  questionBody: {
    padding: theme.spacing(2, 2, 2, 2),
    resize: `vertical`,
    borderColor: theme.border.light,
    outline: 0,  
    width: `100%`,
  },
  // hover: {
  //   backgroundColor: theme.palette.background.sectionHover, // `#e9f6fc`,
  // },
  answerListBody: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: `200px`,
    backgroundColor: theme.palette.background.bodyfield,
  },
  action: {
    padding: theme.spacing(0, 4, 4, 4),
    backgroundColor: theme.palette.background.moduleAddInput,
  },
}));


// Контейнер с вопросом и ответами на него, которые можно создавать и редактировать
const QuestionContainerEdit = ({ open, loading, onClose, question, updateQuestion }) => {
  if (!open) return null;

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const handleClose = () => onClose();

  const listRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: listElement } = listRef;
      console.log('listElement: ', listElement);
      if (listElement !== null) {
        listElement.focus();
      }
    }
  }, [open]);

  const [newQuestion, setNewQuestion] = useState(question.question);
  const handleEditQuestion = (e) => {
    const value = e.target.value;
    if (value !== question.question) {
      setIsChange(true);
      setNewQuestion(value);
    }
  };

  const handleAddAnswer = () => {
    console.log(`Нажали добавить ответ`);
    setIsChange(true);
  };
  const handleEditAnswer = () => {
    console.log(`Нажали редактировать ответ`);
    setIsChange(true);
  };
  const handleDelAnswer = () => {
    console.log(`Нажали удалить ответ`);
    setIsChange(true);
  };

  const handleSubmit = () => {
    console.log(`Нажали сохранить`);
    // updateQuestion();
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
            <HelpOutlineIcon />
          </Avatar>
          <div className={classes.questionBox}>
            <Typography variant="overline">Вопрос</Typography>
            <TextareaAutosize
              className={classes.questionBody}
              placeholder="Введите текст вопроса"
              value={newQuestion}
              rowsMin={2}
              onChange={handleEditQuestion} 
            />
          </div>
        </div>

        <DialogContent dividers ref={listRef} className={classes.answerListBody} >
          <AnswersList
            answers={question.answers}
            onEdit={handleEditAnswer}
            onDel={handleDelAnswer}
          />
        </DialogContent>

        <ElementAdd type={typeElem.ANSWER} onAdd={handleAddAnswer}/>

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
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});

const mapActionsToProps = {
  updateQuestion,
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionContainerEdit);
