import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// import { createDocument, updateDocument, deleteDocument } from '../../../redux/actions/data-actions';
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
import { typeElem } from '../../../../types';

const mock = [{
    title: `Hello my study1`,
    id: 1,
  }, {
    title: `Hello my study2`,
    id: 2,
  }, {
    title: `Hello my study3`,
    id: 3,
  }, {
    title: `Hello my study4`,
    id: 4,
  }
];


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
const QuestionsContainer = ({ open, onClose, rule, errors }) => {
  
  if (!open) return null;
  console.log('rule: ', rule);

  const classes = useStyles();

  const handleEditQuestion = (id) => {
    console.log(`Нажали редактировать вопрос: `, id);;
  };

  const handleDelQuestion = (id) => {
    console.log(`Нажали удалить вопрос: `, id);
  };

  const handleAddQuestion = ({ title }) => {
    console.log(`Нажали добавить вопрос: `, title);
  };

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
            questions={mock}
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
  rule: pt.object.isRequired,
  errors: pt.object.isRequired,

  // createDocument: pt.func.isRequired,
  // updateDocument: pt.func.isRequired,
  // deleteDocument: pt.func.isRequired,
  
  questions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  questions: state.data.questions,
});

const mapActionsToProps = {
 
};

export default connect(mapStateToProps, mapActionsToProps)(QuestionsContainer);
