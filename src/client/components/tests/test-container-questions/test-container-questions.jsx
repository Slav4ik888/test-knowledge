import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateTestData } from '../../../redux/actions/data-actions';
import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Functions
import { getItemFromArrByField } from '../../../utils/arrays';
import { getMixedArray } from '../../../utils/random';
import { typeResAnswer, typeConfirm } from '../../../../types';
// Components
import TestQuestion from '../test-question/test-question';
import TestQuestionsControlPanel from '../test-questions-control-panel/test-questions-control-panel';
import Confirm from '../../confirm/confirm';


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
  },
}));


// 
const TestContainerQuestions = ({ position, testData, rulesForTest, questionsForTest, updateTestData, onShowResult }) => {
  console.log('position: ', position);

  if (!testData.testReady) return null;

  const classes = useStyle();

  // Формирует список вопросов
  const startQuestions = getItemFromArrByField(questionsForTest, `positionId`, position.id).questions;

  if (!testData.questionsAll && testData.questionsAll !== 0) { // Сохраняет начальные данные по тесту 
    updateTestData({
      questionsAll: startQuestions.length,
      questionsRest: startQuestions.length,
      timeStart: new Date(),
    });
  }

  const [questions, setQuestions] = useState(getMixedArray(startQuestions));
  const [errorQuestions, setErrorQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Нажали следующий вопрос
  const handleNextQuestion = (answer) => {
    let newErrorQuestions = [...errorQuestions];
    
    // Проверяет правильность ответа 
    if (answer.resultTotal !== typeResAnswer.RIGHT) { // Если правильный ответ - удаляем этот вопрос
      newErrorQuestions.push(questions[currentQuestion]);
      setErrorQuestions(newErrorQuestions);
    }
    
    if (currentQuestion === questions.length - 1) { // Вопросы закончились
      if (newErrorQuestions.length) { // Был неверный ответ
        setQuestions(getMixedArray(newErrorQuestions));
        setErrorQuestions([]);
        setCurrentQuestion(0);

      } else { // Вопросы закончились. Неверных ответов нет
        handleShowResults(); // Выводит итоги тестирования и завершение.
      }

    } else { // Устанавливаем следующий вопрос
      setCurrentQuestion(currentQuestion + 1);
    }
    
  };

  // Вывод результатов
  const handleShowResults = () => {
    const newTestDate = Object.assign({}, testData);
    newTestDate.timeEnd = new Date();

    onShowResult({
      position,
      testData: newTestDate
    });
  };

  // Для загрытия теста, если для выбранной должности не оказалось вопросов
  const handleCloseTest = () => {
    updateTestData({
      testReady: false,
      questionsAll: null,
    });
  }
  
  return (
    <div className={classes.container}>
      <TestQuestionsControlPanel position={position} question={questions[currentQuestion]} />

      {
        questions.length ? <TestQuestion question={questions[currentQuestion]} onNextQuestion={handleNextQuestion} />
          : <Confirm open={!questions.length} typeOk={typeConfirm.NO_QUESTIONS}
              onOk={handleCloseTest} onCancel={handleCloseTest}
              title = {`Для выбранной должности отсутствуют вопросы. Сообщите об этом своему руководителю.`}
            />
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
  onShowResult: pt.func.isRequired,
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
