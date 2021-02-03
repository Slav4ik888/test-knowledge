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

// Верхняя панель с текущими показателями тестирования
const TestQuestionsControlPanel = ({ position, testData, document }) => {
  console.log('document: ', document);

  const classes = useStyle();


  // Получаем правило из которого этот вопрос, чтобы посмотреть при неправильном ответе


  return (
    <div className={classes.container}>
      <Typography className={classes.positions}>
        Должность: <span className={classes.posTitle}>{position.title}</span>
      </Typography>

      <Typography className={classes.document}>
        Документ: <span className={classes.docTitle}>{document.title || ``}</span>
      </Typography>

      <Typography className={classes.questions}>
        Всего вопросов<span className={classes.questAll}>{testData.questionsAll}</span>
        Осталось ответить на<span className={classes.questRest}>{testData.questionsRest}</span>
        Ошибок<span className={classes.questError}>{testData.errorValue}</span>
      </Typography>
      
      <Divider />
    </div>
  )
};

TestQuestionsControlPanel.propTypes = {
  position: pt.object.isRequired,
  testData: pt.object.isRequired,
  question: pt.object.isRequired, // По вопросу достаётся rule с помощью getDocumentFromRuleForTest
  document: pt.object.isRequired,
  // rule: pt.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  testData: s.getTestData(state),
  document: s.getDocumentFromRuleForTest(state, props),
  // rule: s.getRuleFromRulesForTestById(state, props),
});

export default connect(mapStateToProps)(TestQuestionsControlPanel);
