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


const QuestionsList = ({ questions, onEditOpen, onDel }) => {
  
  if (!questions) return null;
  
  const classes = useStyles();

  return (
    <>
      <List height={200} className={classes.list}>
        {
          questions.length ? questions.map((question) => <QuestionItem key={question.id}
            question={question}
            onEditOpen={onEditOpen}
            onDel={onDel}
          />) : null
        }
      </List> 
    </>
  );
}

QuestionsList.propTypes = {
  onEditOpen: pt.func.isRequired,
  onDel: pt.func.isRequired,
  questions: pt.array.isRequired,
};

export default QuestionsList;
