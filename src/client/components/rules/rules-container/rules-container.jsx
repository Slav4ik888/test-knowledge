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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: `center`,
    width: `100%`,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    width: `100%`,
  },
}));


const RulesContainer = ({ loading, documents }) => {
  
  if (loading) {
    return null;
  }
  const classes = useStyles();

  const [docSelected, setDocSelected] = useState(null);
  const handleDocSelected = (doc) => setDocSelected(doc);


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
        
      </Paper>
    </div>
  );
};


RulesContainer.propTypes = {
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  documents: state.data.documents,
  loading: state.UI.loading,
});

const mapActionsToProps = {
  
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
