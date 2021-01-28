import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// Components


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
    marginBottom: theme.spacing(1),
  },
  posTitle: {
    fontWeight: `bold`,
  },
  questionsLength: {
    fontSize: `10px`,
  },
  questAll: {
    fontWeight: `bold`,
  },
  questRest: {
    fontWeight: `bold`,
  },
  questError: {
    fontWeight: `bold`,
  },
}));


const TestQuestionsControlPanel = ({ positionTitle, testData }) => {

  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Typography>{`Для должности "`}
        <span className={classes.posTitle}>{positionTitle}</span>{`"`}
      </Typography>
      <Typography className={classes.questionsLength}>
        <span>
          {`Всего вопросов `}<span className={classes.questAll}>{testData.questionsAll}</span>
          {`   Осталось ответить на `}<span className={classes.questRest}>{testData.questionsRest}</span>
          {`   Ошибок `}<span className={classes.questError}>{testData.errorValue}</span>
        </span>
      </Typography>
      
      <Divider />
    </div>
  )
};

TestQuestionsControlPanel.propTypes = {
  positionTitle: pt.string.isRequired,
  testData: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  testData: s.getTestData(state),
});

export default connect(mapStateToProps)(TestQuestionsControlPanel);
