import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
    marginBottom: theme.spacing(1),
  },
  positions: {
    fontSize: `18px`,
    color: theme.palette.primary.main,
  },
  posTitle: {
    fontWeight: `bold`,
    paddingLeft: theme.spacing(1),
  },
  document: {
    fontSize: `16px`,
    color: `#7b7b7b`,
  },
  docTitle: {
    fontWeight: `bold`,
    paddingLeft: theme.spacing(1),
  },
  questions: {
    fontSize: `14px`,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  questAll: {
    fontWeight: `bold`,
    padding: theme.spacing(0, 2, 0, 1),
  },
  questRest: {
    fontWeight: `bold`,
    padding: theme.spacing(0, 2, 0, 1),
  },
  questError: {
    fontWeight: `bold`,
    padding: theme.spacing(0, 2, 0, 1),
  },
}));

// Выводит результат тестирования
const TestShowResult = ({ result, onClose }) => {
  console.log('result: ', result);

  if (!result) return null;
  const classes = useStyle();




  return (
    <Dialog
      disableBackdropClick fullWidth
      className={classes.dialog} maxWidth="sm" // scroll={`paper`}
      open={open} onClose={onClose}
    >
      <DialogTitle onClose={onClose}>Результат</DialogTitle>

      <DialogContent dividers className={classes.container} >

        <Typography className={classes.positions}>
          Поздравляем с завершение тестирования!
        </Typography>

        <Typography className={classes.positions}>
          Должность: <span className={classes.posTitle}>{result.position.title}</span>
        </Typography>

        {/* <Typography className={classes.document}>
          Документ: <span className={classes.docTitle}>{document.title || ``}</span>
        </Typography>

        <Typography className={classes.questions}>
          Всего вопросов<span className={classes.questAll}>{testData.questionsAll}</span>
          Осталось ответить на<span className={classes.questRest}>{testData.questionsRest}</span>
          Ошибок<span className={classes.questError}>{testData.errorValue}</span>
        </Typography>
         */}
        <Divider />
      </DialogContent>
    </Dialog>
  )
};

TestShowResult.propTypes = {
  result: pt.object,
  onClose: pt.func.isRequired,
};

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(TestShowResult);
