import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux'
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// Components
import TestQuestion from '../test-question/test-question';
import { getItemFromArrByField } from '../../../utils/arrays';
import { getMixedArray } from '../../../utils/random';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
  },
  header: {
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
}));


const TestQuestionsList = ({ position, testReady, rulesForTest, questionsForTest }) => {

  if (!testReady) return null;

  const classes = useStyle();

  // Формируем список вопросов и перемешиваем их
  const oldQuests = getItemFromArrByField(questionsForTest, `positionId`, position.id).questions;
  const questions = getMixedArray(oldQuests);

  const [currentQuestion, setCurrentQuestion] = useState(questions.length && questions[0]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography>{`Для должности "`}
          <span className={classes.posTitle}>{position.title}</span>{`"`}
        </Typography>
        <Typography className={classes.questionsLength}>
          {`Всего вопросов `}<span className={classes.questAll}>{oldQuests.length}</span>
          {`   Осталось ответить на `}<span className={classes.questRest}>{questions.length}</span>
        </Typography>
      </div>
      <Divider />

      <TestQuestion question={currentQuestion}/>
    </div>
  )
};

TestQuestionsList.propTypes = {
  position: pt.object,
  testReady: pt.bool.isRequired,
  rulesForTest: pt.array.isRequired,
  questionsForTest: pt.array.isRequired,

};

const mapStateToProps = (state) => ({
  testReady: state.data.testReady,
  rulesForTest: state.data.rulesForTest,
  questionsForTest: state.data.questionsForTest,
});

export default connect(mapStateToProps)(TestQuestionsList);
