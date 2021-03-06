import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// import { setRuleStored } from '../../../redux/actions/ui-actions';
import { setActiveRules, setActiveDocument } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsModuleRow from '../../documents/documents-module-row/documents-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import SectionsListModule from '../../sections/sections-list-module/sections-list-module';
import { typeElem } from '../../../../types';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: `center`,
  //   width: `100%`,
  //   height: `100%`,
  //   margin: theme.spacing(2, 0, 2, 0),
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
  // },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: `center`,
    flexDirection: `column`,
    width: `100%`,
    height: `100%`,
    margin: theme.spacing(2, 0, 2, 0),
    backgroundColor: theme.palette.background.bodyfield,
  },
  content: {
    padding: theme.spacing(4),
  },
}));



const RulesContainer = ({ activeDocument, setActiveDocument }) => {

  const classes = useStyles();
  
  // Выбранный документ
  const [docSelected, setDocSelected] = useState(activeDocument);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    setActiveDocument(doc); // Запоминаем выбранное
    // setRuleStored({ docSelected: doc, sectionSelected: null }); // Запоминаем выбранное
    // setActiveRules({ docId: ``, sectionId: `` }); // Обнуляем activeRules
  };

  return (
    <Paper className={classes.paper}>
      <DialogTitle>Редактирование документа</DialogTitle>
      <div className={classes.content}>

        <DocumentsModuleRow onDocumentSelected={handleDocSelected} />

        <PositionsModuleRow item={docSelected} type={typeElem.DOC} />

        <SectionsListModule />
        
      </div>
    </Paper>
  );
};


RulesContainer.propTypes = {
  loading: pt.bool.isRequired,
  activeDocument: pt.object,
  setActiveDocument: pt.func.isRequired,
  // setActiveRules: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  // ruleStored: state.UI.ruleStored,
  // rules: state.data.rules,
  activeDocument: state.data.activeDocument,
});

const mapActionsToProps = {
  // setRuleStored,
  setActiveRules,
  setActiveDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
