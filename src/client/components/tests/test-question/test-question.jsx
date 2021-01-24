import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux'
// MUI Stuff
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Components
import NextQuestion from '../../buttons/next-question/next-question';


// Проверка выбранных ответов сотрудника
const checkAnswers = (question, answers) => {
  let result = true;

  question.answers.forEach((ans, i) => {
    if (ans.trueAnswer !== answers[`answer${i}`]) {
      // console.log(`${ans.trueAnswer} не равно ${answers["answer" + i]}`);
      result = false;
    } 
  });

  return result;
};


// Возвращает начальный объект с ответами в статусе false
const createStartAnswers = (answers) => {
  console.log('answers: ', answers);
  let createdAnswers = {};
  answers.forEach((answer, i) => {
    createdAnswers[`answer${i}`] = false;
  });
  console.log(`createdAnswers: `, createdAnswers);
  return createdAnswers;
};


// Добавленный стиль для FormControlLabel
const FormControlLabelWrap = withStyles({
  root: {
    marginBottom: `10px`,
  },
})((props) => <FormControlLabel {...props} />);


const useStyle = makeStyles((theme) => ({
  question: {
    fontSize: `22px`,
    margin: theme.spacing(2, 0, 2, 0),
  },
  answers: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));


const TestQuestion = ({ question }) => {

  if (!question) return null;
  console.log('question: ', question);

  const classes = useStyle();

  const [employeeAnswer, setEmployeeAnswer] = useState(createStartAnswers(question.answers));
  console.log('employeeAnswer: ', employeeAnswer);
  const handleSetAnswer = (e) => {
    setEmployeeAnswer({ ...employeeAnswer, [e.target.name]: e.target.checked });
  }

  const handleNextQuestion = () => {
    console.log(`Нажали ответить`);
    console.log(checkAnswers(question, employeeAnswer));
  }

  return (  
    <div>
      <Typography className={classes.question}>{question.question}</Typography>
      <Divider />

      <FormGroup className={classes.answers}>
        {
          question.answers.map((answer, idx) => <FormControlLabelWrap
            key={`answer${idx}`}
            control={<Checkbox color={"primary"}
              checked={Boolean(employeeAnswer[`answer${idx}`])}
              onChange={handleSetAnswer}
              name={`answer${idx}`} />}
            label={answer.answer}
          />)
        }
      </FormGroup> 

      <Divider />

      <NextQuestion onNext={handleNextQuestion}/>
    </div>
  )
};

TestQuestion.propTypes = {
  question: pt.object,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(TestQuestion);
