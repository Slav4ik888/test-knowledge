import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Component
import AnswerItem from '../answer-item/answer-item';


const useStyles = makeStyles((theme) => ({
  list: {
    width: `100%`,
  },
}));


const AnswersList = ({ answers, onEdit, onDel }) => {
  
  if (!answers) return null;
  
  const classes = useStyles();

  return (
    <>
      <List height={200} className={classes.list}>
        {
          answers.length ?
            answers.map((answer) => <AnswerItem key={answer.id}
              answer={answer}
              onEdit={onEdit}
              onDel={onDel}
            />) : null
        }
      </List> 
    </>
  );
}

AnswersList.propTypes = {
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  answers: pt.array.isRequired,
};

export default AnswersList;
