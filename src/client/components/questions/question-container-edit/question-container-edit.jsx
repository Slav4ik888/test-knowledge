import React, { useState, useRef, useEffect } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
// import {  } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import AnswersList from '../answers-list/answers-list';
import ElementAdd from '../../buttons/element-add/element-add';
import Snackbar from '../../dialogs/snackbar/snackbar';
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
    backgroundColor: theme.palette.background.section,
  },
  avatar: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
  },
  questionBox: {
    display: `flex`,
    flexDirection: `column`,
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
  textField: {
    margin: `10px auto 10px auto`,
  },
  iconButton: {
    padding: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.bodyfield,
  },
}));


// Контейнер с вопросами, которые можно создавать и редактировать
const QuestionContainerEdit = ({ open, onClose, question, errors }) => {
  if (!open) return null;

  const classes = useStyles();

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

  const [newQuestion, setNewQuestion] = useState(question.question);
  const handleEditQuestion = (e) => {
    const value = e.target.value;
    setNewQuestion(value);
  };

  const handleEditAnswer = () => {
    console.log(`Нажали редактировать ответ`);
  };
  const handleDelAnswer = () => {
    console.log(`Нажали удалить ответ`);
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

        <DialogContent dividers ref={listRef} className={classes.container} >
          <AnswersList
            answers={question.answers}
            onEdit={handleEditAnswer}
            onDel={handleDelAnswer}
          />
        </DialogContent>

        {/* <ElementAdd type={typeElem.QUESTION} onAdd={handleAddQuestion} /> */}

        {/* <Snackbar errors={errors} /> */}

      </Dialog>
    </>
  );
}

QuestionContainerEdit.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  question: pt.object,
  errors: pt.object.isRequired,

};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
});

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(QuestionContainerEdit);
