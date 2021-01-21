import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux'
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Components


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

  const [employeeAnswer, setEmployeeAnswer] = useState({});
  console.log('employeeAnswer: ', employeeAnswer);
  const handleSetAnswer = (e) => {
    setEmployeeAnswer({ ...employeeAnswer, [e.target.name]: e.target.checked });
  }

  return (  
    <div>
      <Typography className={classes.question}>{question.question}</Typography>
      <Divider />

      <FormGroup className={classes.answers}>
        {
          question.answers.map((answer, idx) => <FormControlLabel
            key={`answer${idx}`}
            control={<Checkbox color={"primary"}
              checked={Boolean(employeeAnswer[`answer${idx}`])}
              onChange={handleSetAnswer}
              name={`answer${idx}`} />}
            label={answer.answer}
          />)
        }
      </FormGroup> 
    </div>
  )
};

TestQuestion.propTypes = {
  question: pt.object,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(TestQuestion);
