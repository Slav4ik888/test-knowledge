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

// Верхняя панель с текущими показателями тестирования
const TestQuestionsControlPanel = ({ position, testData, question, document }) => {
  console.log('document: ', document);

  const classes = useStyle();


  // Получаем правило и название документа из которого этот вопрос


  return (
    <div className={classes.container}>
      <Typography>{`Для должности "`}
        <span className={classes.posTitle}>{position.title}</span>{`"`}
      </Typography>
      <Typography className={classes.questionsLength}>
        <span>
          {`Всего вопросов `}<span className={classes.questAll}>{testData.questionsAll}</span>
          {`   Осталось ответить на `}<span className={classes.questRest}>{testData.questionsRest}</span>
          {`   Ошибок `}<span className={classes.questError}>{testData.errorValue}</span>
        </span>
      </Typography>

      <Typography>Документ: {document.title || ``}</Typography>
      
      <Divider />
    </div>
  )
};

TestQuestionsControlPanel.propTypes = {
  position: pt.object.isRequired,
  testData: pt.object.isRequired,
  question: pt.object.isRequired,
  document: pt.object.isRequired,
  rule: pt.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  testData: s.getTestData(state),
  document: s.getDocumentFromRuleForTest(state, props),
  rule: s.getRuleFromRulesForTestById(state, props),
});

export default connect(mapStateToProps)(TestQuestionsControlPanel);
