import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Component
import AddIconRow from '../../buttons/add-icon-row/add-icon-row';
import AnswerItem from '../answer-item/answer-item';
import NewRowCreate from '../../buttons/new-row-create/new-row-create';
import { typeElem } from '../../../../types';
import { sortingArr } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  list: {
    width: `100%`,
  },
}));


const AnswersList = ({ answers, onAdd, onEdit, onDel }) => {
  
  if (!answers) return null;
  console.log(`AnswersList`);
  const classes = useStyles();
  
  // Получаем answers отсортированные по order
  const answersShow = sortingArr(answers, `order`);
  
  return (
    <>
      <List height={200} className={classes.list}>
        {
          answersShow.length ? <>
            <AddIconRow up type={typeElem.ANSWER} onAddAnswer={onAdd} items={answersShow} item={answersShow[0]} />
            
            {
              answersShow.map((answer, i) => <AnswerItem key={`${answer.id} + ${i}`}
                answers={answersShow}
                answer={answer}
                onAdd={onAdd}
                onEdit={onEdit}
                onDel={onDel}
              />)
            }
          </> : <NewRowCreate type={typeElem.ANSWER} onAddAnswer={onAdd} />
        }
      </List> 
    </>
  );
}

AnswersList.propTypes = {
  onAdd: pt.func.isRequired,
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  answers: pt.array.isRequired,
};

export default AnswersList;
