import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Components
import TestQuestion from '../test-question/test-question';
import TestQuestionsControlPanel from '../test-questions-control-panel/test-questions-control-panel';
import { getItemFromArrByField } from '../../../utils/arrays';
import { getMixedArray } from '../../../utils/random';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
  },
}));


const TestQuestionsList = ({ position, testReady, rulesForTest, questionsForTest }) => {

  if (!testReady) return null;

  const classes = useStyle();

  // Формируем список вопросов и перемешиваем их
  const allQuestions = getItemFromArrByField(questionsForTest, `positionId`, position.id).questions;
  const questions = getMixedArray(allQuestions);

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
      <TestQuestionsControlPanel positionTitle={position.title} />
      {
        questions.length ? <TestQuestion question={questions[currentQuestion]} onNextQuestion={handleNextQuestion} /> 
          : null
      }
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
  testReady: s.getTestReady(state),
  rulesForTest: s.getRulesForTest(state),
  questionsForTest: s.getQuestionsForTest(state),
});

export default connect(mapStateToProps)(TestQuestionsList);
