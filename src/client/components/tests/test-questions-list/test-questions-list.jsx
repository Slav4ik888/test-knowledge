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


const TestQuestionsList = ({ position, testData, rulesForTest, questionsForTest }) => {

  if (!testData.testReady) return null;

  const classes = useStyle();

  // Формируем список вопросов и перемешиваем их
  const oldQuests = getItemFromArrByField(questionsForTest, `positionId`, position.id).questions;
  const questions = getMixedArray(oldQuests);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleNextQuestion = () => {
    if (currentQuestion === questions.length) {
      // Вопросы закончились
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    
};
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography>{`Для должности "`}
          <span className={classes.posTitle}>{position.title}</span>{`"`}
        </Typography>
        <Typography className={classes.questionsLength}>
          <span>
            {`Всего вопросов `}<span className={classes.questAll}>{oldQuests.length}</span>
            {`   Осталось ответить на `}<span className={classes.questRest}>{questions.length}</span>
          </span>
        </Typography>
      </div>
      <Divider />
      {
        questions.length ? <TestQuestion question={questions[currentQuestion]} onNextQuestion={handleNextQuestion} /> 
          : null
      }
           
    </div>
  )
};

TestQuestionsList.propTypes = {
  position: pt.object,
  testData: pt.object.isRequired,
  rulesForTest: pt.array.isRequired,
  questionsForTest: pt.array.isRequired,

};

const mapStateToProps = (state) => ({
  testData: state.data.testData,
  rulesForTest: state.data.rulesForTest,
  questionsForTest: state.data.questionsForTest,
});

export default connect(mapStateToProps)(TestQuestionsList);
