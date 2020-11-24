import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Components
import ListSelect from '../../list-select/list-select';
import PositionsListChip from '../../positions/positions-list-chip/positions-list-chip';
import SectionsContainer from '../../sections/sections-container/sections-container';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: `center`,
    width: `100%`,
    height: `100%`,
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
  },
  paper: {
    width: `100%`,
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  paperChip: {
    width: `100%`,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    border: `1px solid #ccc`,
    borderRadius: `5px`,
  },
  block: {
    display: `block`,
  }
}));


const RulesContainer = ({ loading, documents, positions }) => {
  console.log('positions: ', positions);
  
  if (loading) {
    return null;
  }
  const classes = useStyles();

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(null);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    if (doc) { // Выбираем должности закреплённые за данным документом
      setPosFromDoc(positions.filter((pos) => doc.positions.find((docPos) => docPos.id === pos.id)))
    } else {
      setPosFromDoc([]);
    }
  };

  // Должности закреплённые за выбранным документом
  const [posFromDoc, setPosFromDoc] = useState([]);

  // Выбранный раздел
  const [sectionSelected, SetSectionSelected] = useState(null);
  
  const [isSections, setIsSections] = useState(false);
  const handleSectionsOpen = () => setIsSections(true);
  const handleSectionsClose = () => setIsSections(false);
  
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
        <Paper elevation={0} className={classes.paperChip}>
          <PositionsListChip positions={posFromDoc} />
        </Paper>

        <ListSelect
          title={`Раздел`}
          items={docSelected && docSelected.sections}
          valueField={`title`}
          label={`sections`}
          placeholder={`Не указан`}
          disabled={!Boolean(docSelected)}
          onSelected={SetSectionSelected}
        />
        <Button onClick={handleSectionsOpen} disabled={!docSelected}>
          Разделы
        </Button>
        <SectionsContainer
          open={isSections}
          document={docSelected}
          onClose={handleSectionsClose}
        />
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
