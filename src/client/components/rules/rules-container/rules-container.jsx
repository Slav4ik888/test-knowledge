import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// Components
import ListSelect from '../../list-select/list-select';
import PositionsListChip from '../../positions/positions-list-chip/positions-list-chip';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: `center`,
    width: `100%`,
    minHeight: `maxcontent`,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    width: `100%`,
    padding: theme.spacing(4),
  },
}));


const RulesContainer = ({ loading, documents, positions }) => {
  console.log('positions: ', positions);
  
  if (loading) {
    return null;
  }
  const classes = useStyles();

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(null);
  // Должности закреплённые за выбранным документом
  const [posFromDoc, setPosFromDoc] = useState([]);

  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    console.log('doc: ', doc);
    if (doc) {
      setPosFromDoc(positions.filter((pos) => doc.positions
        .find((docPos) => docPos.id === pos.id)))
      console.log('posFromDoc: ', posFromDoc);
    }
  };

  
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ListSelect
          title={`Документ`}
          items={documents}
          valueField={`title`}
          label={`documents`}
          placeholder={`Не указан`}
          onSelected={handleDocSelected}
        />
        <Paper className={classes.paper}>
          <PositionsListChip positions={posFromDoc} />
        </Paper>
      </Paper>
    </div>
  );
};


RulesContainer.propTypes = {
  documents: pt.array.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  documents: state.data.documents,
  positions: state.data.positions,
  loading: state.UI.loading,
});

const mapActionsToProps = {
  
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
