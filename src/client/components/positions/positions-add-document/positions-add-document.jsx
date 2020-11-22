import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocumentsServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
    // width: `100%`,
    // maxWidth: `800px`,
  },
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

const PositionsAddDocument = ({ open, onClose, UI: { loading }, doc, documents, positions, updateDocumentsServer }) => {
  
  if (!open) return null;

  const classes = useStyles();

  const idxDoc = documents.findIndex(document => document.id === doc.id);
  const positionsInDocument = documents[idxDoc].positions;

  const remainingPositions = positions
    .filter((pos) => Boolean(positionsInDocument
      .find((posInDoc) => posInDoc.id === pos.id)) === false);

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(positionsInDocument);
  const [right, setRight] = useState(remainingPositions);

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
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleSetPosToDoc = () => {
    let newDocuments = documents;
    newDocuments[idxDoc].positions = left;
    updateDocumentsServer(newDocuments);
    onClose();
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
            inputProps={{ 'aria-label': 'выбраны все должности' }}
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
    <Dialog
      disableBackdropClick fullWidth
      className={classes.dialog} maxWidth="xl" scroll={`paper`}
      open={open} onClose={onClose}
    >
      <DialogTitle onClose={onClose}>Выберите те должности, которым нужно полностью знать этот документ</DialogTitle>
      <DialogContent dividers>
        
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
              positions.length === 0 ?
                `Для того, чтобы закрепить должность за документом - вначале нужно создайть хотя бы одну должность.`
              :
              customList('Существующие', right)
            }
            
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions className={classes.dialog}>
        <Button onClick={onClose} >
          Отмена
        </Button>
        <Button onClick={handleSetPosToDoc} disabled={loading} variant="contained" color="primary">
          Сохранить
          {
            loading && (
              <CircularProgress size={30} className={classes.progress}/>
            )
          }
        </Button>
      </DialogActions>

    </Dialog>
  );
};

PositionsAddDocument.propTypes = {
  doc: pt.object.isRequired,
  documents: pt.array.isRequired,
  positions: pt.array.isRequired,
  updateDocumentsServer: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
  positions: state.data.positions,
});

export default connect(mapStateToProps, { updateDocumentsServer })(PositionsAddDocument);
