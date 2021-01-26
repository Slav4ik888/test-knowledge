import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Icons
import WrongIcon from '@material-ui/icons/AssignmentLate';
import RightIcon from '@material-ui/icons/AssignmentTurnedIn';
// Components
import { typeResAnswer } from '../../../../types';


// Добавленный стиль для FormControlLabel
const FormControlLabelWrap = withStyles({
  root: {
    marginBottom: `10px`,
  },
})((props) => <FormControlLabel {...props} />);


const useStyle = makeStyles((theme) => ({
  container: {
    display: `flex`,
    // flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  noAnswer: {
    color: theme.palette.fontColor.noAnswer,
  },
  wrongAnswer: {
    color: theme.palette.fontColor.wrongAnswer,
  },
  rightAnswer: {
    color: theme.palette.fontColor.rightAnswer,
  },
  icon: {
    marginBottom: `5px`,
  },
}));


const TestAnswer = ({ employeeAnswer, idx, onSetAnswer, answer, result }) => {
  console.log('employeeAnswer: ', employeeAnswer);

  const classes = useStyle();

  const checked = Boolean(employeeAnswer[`answer${idx}`]);
  const [resAnswer, setResAnswer] = useState(employeeAnswer[`result${idx}`]);
  console.log(`resAnswer${idx}: `, resAnswer);
  useEffect(() => {
    console.log(`useEffect ${idx}`);
    setResAnswer(employeeAnswer[`result${idx}`]);
  }, [result]);

  let clClass = classes.noAnswer;
  let icon = null;

  switch (resAnswer) {
    case typeResAnswer.NO_CHECK:
      console.log('NO_CHECK: ', idx);
      icon = null;
      clClass = classes.noAnswer;
      break;
    case typeResAnswer.RIGHT:
      console.log('RIGHT: ', idx);
      icon = <RightIcon className={classes.icon} />;
      clClass = classes.rightAnswer;
      break;
    case typeResAnswer.WRONG:
      console.log('WRONG: ', idx);
      icon = <WrongIcon className={classes.icon} />;
      clClass = classes.wrongAnswer;
      break;
  }

  return (  
    <div className={cl(classes.container, clClass)}>
      <FormControlLabelWrap
        control={<Checkbox color={"primary"}
          className={clClass}
          checked={checked}
          onChange={onSetAnswer}
          name={`answer${idx}`} />}
        label={answer}
      />
      {
        result && icon
      }
    </div>
  )
};

TestAnswer.propTypes = {
  employeeAnswer: pt.object.isRequired,
  idx: pt.number.isRequired,
  onSetAnswer: pt.func.isRequired,
  answer: pt.string.isRequired,
};


export default TestAnswer;
