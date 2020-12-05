import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { setRuleStored } from '../../../redux/actions/ui-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsModuleRow from '../../documents/documents-module-row/documents-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import SectionsModuleRow from '../../sections/sections-module-row/sections-module-row';
import { typePosModule } from '../../../../types';

const useStyles = makeStyles((theme) => {
  // console.log('theme: ', theme);

  return ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: `center`,
      width: `100%`,
      height: `100%`,
      marginTop: theme.spacing(2),
      // '& > *': {
      //   margin: theme.spacing(1),
      //   width: theme.spacing(16),
      //   height: theme.spacing(16),
      // },
    },
    paper: {
      width: `100%`,
    },
    content: {
      padding: theme.spacing(4),
    },
    row: {
      display: 'flex',
      alignItems: `center`,
      margin: theme.spacing(2, 0, 4, 0),
    },
    avatar: { 
      marginRight: theme.spacing(3),
    },
    editIcon: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(3),
    },
  })
});


const RulesContainer = ({ loading, setRuleStored, ruleStored }) => {
  if (loading) return <CircularProgress disableShrink />;

  const classes = useStyles();

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(ruleStored.docSelected);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    setRuleStored({ docSelected: doc, sectionSelected }); // Запоминаем выбранное 
  };

  // Выбранный раздел
  const [sectionSelected, setSectionSelected] = useState(ruleStored.sectionSelected);
  const handleSectionSelected = (section) => {
    setSectionSelected(section);
    setRuleStored({ docSelected, sectionSelected: section }); // Запоминаем выбранное 
  };
  
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DialogTitle >Новое правило</DialogTitle>
        <div className={classes.content}>

          <DocumentsModuleRow onDocumentSelected={handleDocSelected} />

          <PositionsModuleRow item={docSelected} type={typePosModule.DOC} />

          <SectionsModuleRow docSelected={docSelected} onSectionSelected={handleSectionSelected} />
          

          {/* <Button onClick={handleSectionsOpen} disabled={!docSelected}>
            Разделы
          </Button> */}
        </div>
      </Paper>
    </div>
  );
};


RulesContainer.propTypes = {
  ruleStored: pt.object.isRequired,
  setRuleStored: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
  loading: state.UI.loading,
});

const mapActionsToProps = {
  setRuleStored,
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
