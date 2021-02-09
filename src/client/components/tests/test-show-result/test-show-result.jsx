import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateUserTestingData } from '../../../redux/actions/user-actions';
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
// Functions
import { tPassedStr } from '../../../utils/time';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
    marginBottom: theme.spacing(1),
    minHeight: `200px`,
  },
  positions: {
    fontSize: `18px`,
    color: theme.palette.primary.main,
  },
  posTitle: {
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
  errors: {
    fontSize: `14px`,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  questError: {
    fontWeight: `bold`,
    padding: theme.spacing(0, 2, 0, 1),
  },
}));

// Выводит результат тестирования
const TestShowResult = ({ result, onClose, userProfile, updateUserTestingData }) => {

  if (!result) return null;
  console.log('result: ', result);

  const classes = useStyle();

  const { position } = result;

  const { errorValue, questionsAll, timeStart, timeEnd } = result.testData;

  const timeTest = tPassedStr(timeEnd.getTime() - timeStart.getTime());

  const title = errorValue ? `Тестирование завершено` : `Поздравляем с успешным завершением тестирования!`;

  const handleClose = () => {
    // Сохраняем в профиль user
    userProfile.newPassedTesting = { position: position.title, errorValue, questionsAll, timeStart, timeEnd };
    updateUserTestingData(userProfile);
    onClose();
  }


  return (
    <Dialog
      disableBackdropClick fullWidth
      className={classes.dialog} maxWidth="sm" // scroll={`paper`}
      open={Boolean(result)} onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>{title}</DialogTitle>

      <DialogContent dividers className={classes.container} >

        <Typography className={classes.positions}>
          Должность: <span className={classes.posTitle}>{position.title}</span>
        </Typography>

        <Typography className={classes.errors}>
          Всего вопросов: <span className={classes.questAll}>{questionsAll}</span>
        </Typography>
        <Typography className={classes.errors}>
          Длительность тестирования: <span className={classes.questAll}>{timeTest}</span>
        </Typography>
        <Typography className={classes.errors}>
          Ошибок: <span className={classes.questError}>{errorValue}</span>
        </Typography>

        <Divider />
      </DialogContent>
    </Dialog>
  )
};

TestShowResult.propTypes = {
  result: pt.object,
  onClose: pt.func.isRequired,
  userProfile: pt.object.isRequired,
  updateUserTestingData: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
});

export default connect(mapStateToProps, { updateUserTestingData })(TestShowResult);
