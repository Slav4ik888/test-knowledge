import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Component
import QuestionItem from '../question-item/question-item';

const useStyles = makeStyles((theme) => ({
  list: {
    width: `100%`,
  },
}));


const QuestionsList = ({ questions, onEdit, onDel }) => {
  
  if (!questions) return null;

  const classes = useStyles();

  return (
    <>
      <List height={200} className={classes.list}>
        {
          questions.map((question) => <QuestionItem key={question.id}
            question={question}
            onEdit={onEdit}
            onDel={onDel}
          />)
        }
      </List> 
    </>
  );
}

QuestionsList.propTypes = {
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  questions: pt.array.isRequired,
};

export default QuestionsList;
