import React, { useState, useRef, useEffect } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { createQuestion, getAllQuestionsByRuleId, deleteQuestion } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import QuestionsList from '../questions-list/questions-list';
import ElementAdd from '../../buttons/element-add/element-add';
import QuestionContainerEdit from '../question-container-edit/question-container-edit';
import { typeElem, typeQuestions } from '../../../../types';
import { getMaxOrder } from '../../../../server/utils/utils';
import { getQuestionsFromRuleId, sortingArr } from '../../../utils/utils';
import { getItemFromArrById } from '../../../utils/arrays';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
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
const QuestionsContainer = ({ open, onClose, ruleId, errors, allQuestions, getAllQuestionsByRuleId, createQuestion, deleteQuestion }) => {
  
  if (!open) return null;

  let questions = [];
  const activeQuestionsObj = getQuestionsFromRuleId(allQuestions, ruleId);

  // Проверяем загружали ли уже и если нет то загружаем первый раз
  if (!activeQuestionsObj) {
    console.log(`Нет загр-х questions - ЗАГРУЖАЕМ`);
    getAllQuestionsByRuleId({ ruleId });

  } else { // Есть загр-е - НЕ загружаем
    questions = sortingArr(activeQuestionsObj.questions, `order`); // Получаем questions отсортированные по order
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

  // Открываем контейнер для редактирования выбранного question
  const [quest, setQuest] = useState({}); // Вопрос передаваемый в QuestionContainerEdit
  const [editId, setEditId] = useState(null);
  const handleEditOpen = (id) => {
    setQuest(getItemFromArrById(questions, id));
    setEditId(id);
  };
  const handleEditClose = () => {
    setQuest({});
    setEditId(null);
  };

  // Удаляем вопрос
  const handleDelQuestion = (id) => {
    const question = getItemFromArrById(questions, id);
    deleteQuestion(question);
  };

  
  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка вопросов для тестирования</DialogTitle>
        <DialogContent dividers ref={listRef} className={classes.container}>
          <QuestionsList
            questions={questions}
            onEditOpen={handleEditOpen}
            onDel={handleDelQuestion}
          />
        </DialogContent>

        <ElementAdd type={typeElem.QUESTION} onAdd={handleAddQuestion}/>

        <QuestionContainerEdit
          open={Boolean(editId)}
          onClose={handleEditClose}
          question={quest}
        />

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
  deleteQuestion: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  allQuestions: state.data.questions,
});

const mapActionsToProps = {
  createQuestion,
  getAllQuestionsByRuleId,
  deleteQuestion,
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionsContainer);
