import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux'
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles((theme) => {

});


const TestQuestionsList = ({ positionId, testReady, rulesForTest, questionsForTest }) => {

  if (!testReady) return null;

  const classes = useStyle();

  return (
    <div>
      Список вопросов для {positionId}
    </div>
  )
};

TestQuestionsList.propTypes = {
  positionId: pt.string,
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
