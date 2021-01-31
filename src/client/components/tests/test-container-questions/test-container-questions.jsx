import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateTestData } from '../../../redux/actions/data-actions';
import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Components
import TestQuestion from '../test-question/test-question';
import TestQuestionsControlPanel from '../test-questions-control-panel/test-questions-control-panel';
import { getItemFromArrByField } from '../../../utils/arrays';
import { getMixedArray } from '../../../utils/random';
import { typeResAnswer } from '../../../../types';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
  },
}));


// 
const TestContainerQuestions = ({ position, testData, rulesForTest, questionsForTest, updateTestData }) => {

  if (!testData.testReady) return null;

  const classes = useStyle();

  // Формируем список вопросов
  const startQuestions = getItemFromArrByField(questionsForTest, `positionId`, position.id).questions;
  console.log('startQuestions: ', startQuestions);

  if (!testData.questionsAll) { // Сохраняет начальные данные по тесту 
    updateTestData({
      questionsAll: startQuestions.length,
      questionsRest: startQuestions.length,
    });
  }

  const [questions, setQuestions] = useState(getMixedArray(startQuestions));

  const [errorQuestions, setErrorQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Нажали следующий вопрос
  const handleNextQuestion = (answer) => {
    let newErrorQuestions = [...errorQuestions];
    console.log('newErrorQuestions: ', newErrorQuestions);
    // Проверяем правильность ответа 
    if (answer.resultTotal !== typeResAnswer.RIGHT) { // Если правильный ответ - удаляем этот вопрос
      newErrorQuestions.push(questions[currentQuestion]);
      setErrorQuestions(newErrorQuestions);
    }
    
    if (currentQuestion === questions.length) { // Вопросы закончились
      if (newErrorQuestions.length) { // Был неверный ответ
        console.log('newErrorQuestions.length: ', newErrorQuestions.length);
        setQuestions(getMixedArray(newErrorQuestions));
        setErrorQuestions([]);
        setCurrentQuestion(0);

      } else {
        console.log(`Вопросы закончились. Неверных ответов нет.`);
      }

    } else { // Устанавливаем следующий вопрос
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

TestContainerQuestions.propTypes = {
  position: pt.object,
  testData: pt.object.isRequired,
  rulesForTest: pt.array.isRequired,
  questionsForTest: pt.array.isRequired,
  updateTestData: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  testData: s.getTestData(state),
  rulesForTest: s.getRulesForTest(state),
  questionsForTest: s.getQuestionsForTest(state),
});

const mapActionsToProps = {
  updateTestData,
};

export default connect(mapStateToProps, mapActionsToProps)(TestContainerQuestions);
