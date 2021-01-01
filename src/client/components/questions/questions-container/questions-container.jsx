import React, { useRef, useEffect } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { createQuestion, getAllQuestionsByRuleId } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiAlert from '@material-ui/lab/Alert';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import QuestionsList from '../questions-list/questions-list';
import ElementAdd from '../../buttons/element-add/element-add';
import Snackbar from '../../dialogs/snackbar/snackbar';
import { typeElem, typeQuestions } from '../../../../types';
import { getMaxOrder } from '../../../../server/utils/utils';
import { getQuestionsFromRuleId, sortingArr } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
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
const QuestionsContainer = ({ open, onClose, ruleId, errors, allQuestions, getAllQuestionsByRuleId, createQuestion }) => {
  
  
  if (!open) return null;
  console.log('allQuestions: ', allQuestions);

  let questions = [];

  const activeQuestionsObj = getQuestionsFromRuleId(allQuestions, ruleId);
  console.log('activeQuestionsObj: ', activeQuestionsObj);

  // Проверяем загружали ли уже и если нет то загружаем первый раз
  if (!activeQuestionsObj) {
    console.log(`Нет загр-х questions - ЗАГРУЖАЕМ`);
    getAllQuestionsByRuleId({ ruleId });

  } else {
    console.log(`Есть загр-е - НЕ загружаем`);
    // Получаем questions отсортированные по order
    questions = sortingArr(activeQuestionsObj.questions, `order`);
  }


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


  const handleAddQuestion = ({ title }) => {
    const newQuestion = {
      ruleId,
      order: getMaxOrder(questions),
      typeQuestion: typeQuestions.ONE_ANSWER,
      question: title,
    };

    createQuestion(newQuestion);
  };

  const handleEditQuestion = (id) => {
    console.log(`Нажали редактировать вопрос: `, id);
  };

  const handleDelQuestion = (id) => {
    console.log(`Нажали удалить вопрос: `, id);
  };

  
  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка вопросов</DialogTitle>
        <DialogContent dividers ref={listRef} className={classes.container} >
          <QuestionsList
            questions={questions}
            onEdit={handleEditQuestion}
            onDel={handleDelQuestion}
          />
        </DialogContent>

        <ElementAdd type={typeElem.QUESTION} onAdd={handleAddQuestion} />

        <Snackbar errors={errors} />

      </Dialog>
    </>
  );
}

QuestionsContainer.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  ruleId: pt.string.isRequired,
  errors: pt.object.isRequired,
  createQuestion: pt.func.isRequired,
  allQuestions: pt.array.isRequired,
  getAllQuestionsByRuleId: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  allQuestions: state.data.questions,
});

const mapActionsToProps = {
  createQuestion,
  getAllQuestionsByRuleId,
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionsContainer);
