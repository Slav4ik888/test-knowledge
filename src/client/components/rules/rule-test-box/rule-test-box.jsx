import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Components
import QuestionsBtnContainer from '../../questions/questions-btn-container/questions-btn-container';
import PositionsIconShow from '../../positions/positions-icon-show/positions-icon-show';
import { typeElem } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: `center`,
    justifyContent: `flex-end`,
    flexDirection: `row`,
    width: `100%`,
    // marginTop: theme.spacing(2),
    padding: theme.spacing(1, 0, 1, 0),
    // backgroundColor: theme.palette.background.bodyfield,
  },
}));

// Нижняя часть в rule: questions, positions
const RuleTestBox = ({ rule }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <QuestionsBtnContainer rule={rule} />
        <PositionsIconShow type={typeElem.RULE} item={rule} />
      </div>
    </>
  );
};


RuleTestBox.propTypes = {
  rule: pt.object.isRequired,
};

export default RuleTestBox;
