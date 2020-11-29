import React, { useState } from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  grid: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 300,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

// Возвращает массив a без того что есть в b
function not(a, b) {
  return a.filter((value) => Boolean(b.find(it => it.id === value.id)) === false);
}
// Возвращает массив a с совпадением того что есть в b
function intersection(a, b) {
  return a.filter((value) => b.findIndex(it => it.id === value.id) !== -1); // b.indexOf(value) !== -1
}
// Возвращает массив а объединённый с b
function union(a, b) {
  return [...a, ...not(b, a)];
}

const ToggleItems = ({ elemsLeft, elemsRight, onSelected, whatSelected }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(elemsLeft);
  const [right, setRight] = useState(elemsRight);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex(it => it.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onSelected(not(left, leftChecked)); // Сообщаем, что изменилось в левой части
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    onSelected(left.concat(rightChecked)); // Сообщаем, что изменилось в левой части
  };


  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': `выбраны все ${whatSelected}` }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} выбрано`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const id = value.id;
          const labelId = `transfer-list-all-item-${id}-label`;

          return (
            <ListItem key={id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={Boolean(checked.find(it => it.id === id)) === true}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.title} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.grid}>
          <Grid item>{customList('Выбранные', left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            {
              right.length === 0 ?
                `Нет элементов для выбора`
              :
              customList('Существующие', right)
            }
            
          </Grid>
        </Grid>
  );
};

ToggleItems.propTypes = {
  whatSelected: pt.string.isRequired,
  elemsLeft: pt.array.isRequired,
  elemsRight: pt.array.isRequired,
  onSelected: pt.func.isRequired,
};

export default ToggleItems;
