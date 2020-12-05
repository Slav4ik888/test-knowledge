import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { setRuleStored } from '../../../redux/actions/ui-actions';
import { getAllRulesById } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsModuleRow from '../../documents/documents-module-row/documents-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import SectionsModuleRow from '../../sections/sections-module-row/sections-module-row';
import RulesModuleRow from '../../rules/rules-module-row/rules-module-row';
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


const RulesContainer = ({ setRuleStored, ruleStored, getAllRulesById, rules }) => {
  console.log('rules: ', rules);
  const classes = useStyles();

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(ruleStored.docSelected);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    setSectionSelected(null); // Обнуляем выбранную ранее section
    setRuleStored({ docSelected: doc, sectionSelected }); // Запоминаем выбранное 
  };

  // Выбранный раздел - section
  const [sectionSelected, setSectionSelected] = useState(ruleStored.sectionSelected);
  const handleSectionSelected = (section) => {
    setSectionSelected(section);
    setRuleStored({ docSelected, sectionSelected: section }); // Запоминаем выбранное 
    if (section) {
      const checkRule = rules.find((item) => item.docId === docSelected.docId && item.sectionId === section.sectionId)
      console.log('checkRule: ', checkRule);
      if (!checkRule) { // Если ещё не загружали
        getAllRulesById({ docId: docSelected.id, sectionId: section.id }); // Загружаем rules с db
      }
    }
  };

  // Загруженные rules под выбранный section
  const [rulesInSection, setRulesInSection] = useState([]);

  if (rules.length) {
    if (sectionSelected) {
      const setRuls = rules.find((item) => item.docId === docSelected.docId && item.sectionId === sectionSelected.sectionId);
      console.log('setRuls: ', setRuls);
      if (setRuls) {
        const lRules = setRuls.rules;
        setRulesInSection(lRules);
      }
    }
  }
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DialogTitle >Новое правило</DialogTitle>
        <div className={classes.content}>

          <DocumentsModuleRow onDocumentSelected={handleDocSelected} />

          <PositionsModuleRow item={docSelected} type={typePosModule.DOC} />

          <SectionsModuleRow docSelected={docSelected} onSectionSelected={handleSectionSelected} />
          
          <RulesModuleRow rulesInSection={rulesInSection} docSelected={docSelected} sectionSelected={sectionSelected} />

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
  getAllRulesById: pt.func.isRequired,
  rules: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
  rules: state.data.rules,
});

const mapActionsToProps = {
  setRuleStored,
  getAllRulesById,
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
