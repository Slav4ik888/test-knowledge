import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
// Components
import TestAnswer from '../test-answer/test-answer';
import NextQuestion from '../../buttons/next-question/next-question';
import { typeResAnswer } from '../../../../types';


/**
 * Возвращает {} answers with `answer0...4` || `result0..4`
 * @param {Array} answers 
 * @param {Object} obj 
 * @param {String} field 
 * 
 * @return {Object} updatedObj
 */
const clearFields = (answers, obj, field) => {
  let updatedObj = Object.assign({}, obj);

  answers.forEach((item, i) => updatedObj[`${field}${i}`] = field === `answer` ? false : typeResAnswer.NO_CHECK);

  return updatedObj;
};


// Возвращает начальный объект с ответами в статусе false
const createStartAnswers = (answers) => {
  let ans = {};
  ans = clearFields(answers, {}, `answer`);
  ans = clearFields(answers, ans, `result`);
  ans.resultTotal = typeResAnswer.NO_CHECK;

  return ans;
};

/**
 * Возвращает answers промаркированными typeResAnswer выбранные ответы сотрудника
 * @param {Object} question 
 * @param {Object} answers 
 * 
 * @return {Object} answers
 */
const checkAnswers = (question, answers) => {
  answers.resultTotal = typeResAnswer.RIGHT;

  question.answers.forEach((ans, i) => {
    if (ans.trueAnswer !== answers[`answer${i}`]) { // Выбрали не верный ответ
      // console.log(`${ans.trueAnswer} не равно ${answers["answer" + i]}`);
      answers[`result${i}`] = typeResAnswer.WRONG;
      answers.resultTotal = typeResAnswer.WRONG;

    } else if (ans.trueAnswer) { // Выбрали верный ответ
      answers[`result${i}`] = typeResAnswer.RIGHT;
    }
    if (ans.trueAnswer) { // Правильный ответ в любом случае отмечаем верным, чтобы загорелся зелёным
      answers[`result${i}`] = typeResAnswer.RIGHT;
    }
  });

  return answers;
};


const useStyle = makeStyles((theme) => ({
  question: {
    fontSize: `22px`,
    margin: theme.spacing(2, 0, 2, 0),
  },
  answers: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));


const TestQuestion = ({ question, onNextQuestion }) => {

  if (!question) return null;

  const classes = useStyle();

  const [employeeAnswer, setEmployeeAnswer] = useState(createStartAnswers(question.answers));

  useEffect(() => {
    console.log(`question Effect`);
    setEmployeeAnswer(createStartAnswers(question.answers));
  }, [question]);

  const handleSetAnswer = (e) => {
    if (!isCheck) {
      setEmployeeAnswer({ ...employeeAnswer, [e.target.name]: e.target.checked });
      setIsCheck(false);
    }
  };

  const [isCheck, setIsCheck] = useState(false);

  const handleCheckQuestion = () => {
    const checkedAnswers = checkAnswers(question, employeeAnswer);
    setEmployeeAnswer(checkedAnswers);
    setIsCheck(true);
  };

  const handleNextQuestion = () => {
    setEmployeeAnswer(createStartAnswers(question.answers));
    setIsCheck(false);
    onNextQuestion();
  };

  return (  
    <div>
      <Typography className={classes.question}>{question.question}</Typography>
      <Divider />

      <FormGroup className={classes.answers}>
        {
          question.answers.map((answer, idx) => <TestAnswer
            key={`answer${idx}`}
            employeeAnswer={employeeAnswer}
            onSetAnswer={handleSetAnswer}
            idx={idx}
            answer={answer.answer}
            result={isCheck}
          />)
        }
      </FormGroup> 

      <Divider />

      {
        isCheck
          ? <NextQuestion onCallback={handleNextQuestion} text={`Следующий вопрос`} next />
          : <NextQuestion onCallback={handleCheckQuestion} text={`Ответить`} />
      }
      
    </div>
  )
};

TestQuestion.propTypes = {
  question: pt.object,
  onNextQuestion: pt.func.isRequired,
};


export default TestQuestion;
