import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { setRuleStored } from '../../../redux/actions/ui-actions';
import { getAllRulesById, setActiveRules } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsModuleRow from '../../documents/documents-module-row/documents-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import SectionsListModule from '../../sections/sections-list-module/sections-list-module';
import SectionsModuleRow from '../../sections/sections-module-row/sections-module-row';
import RulesModuleRow from '../../rules/rules-module-row/rules-module-row';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import Confirm from '../../confirm/confirm';
import { typePosModule, typeConfirm } from '../../../../types';
import { getRulesFromDocAndSection } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: `center`,
    width: `100%`,
    height: `100%`,
    margin: theme.spacing(2, 0, 2, 0),
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
  },
  paper: {
    width: `100%`,
    // backgroundColor: theme.palette.background.default,
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
  cancelSubmitBtn: {
    margin: theme.spacing(4, 0, 4, 0),
    position: `relative`,
    float: `right`,
  },
}));



const RulesContainer = ({ loading, setRuleStored, ruleStored, getAllRulesById, rules, setActiveRules }) => {

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  // Подтверждение выхода без сохранения
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseConfirm = () => setIsOpen(false);
  const handleOkConfirm = () => {
    setIsOpen(false);
    // TODO: Выход без сохранения
  };
  const handleOpenConfirm = () => setIsOpen(true);

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(ruleStored.docSelected);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
    // setSectionSelected(null); // Обнуляем выбранную ранее section
    setRuleStored({ docSelected: doc, sectionSelected: null }); // Запоминаем выбранное
    setActiveRules({ docId: ``, sectionId: `` }); // Обнуляем activeRules
  };

  // // Выбранный раздел - section
  // const [sectionSelected, setSectionSelected] = useState(ruleStored.sectionSelected);
  // const handleSectionSelected = (section) => {
  //   setSectionSelected(section);
  //   setRuleStored({ docSelected, sectionSelected: section }); // Запоминаем выбранное 
  //   if (section) {
  //     const checkRule = getRulesFromDocAndSection(rules, docSelected.id, section.id);
  //     console.log('checkRule: ', checkRule);
  //     if (!checkRule) { // Если ещё не загружали
  //       getAllRulesById({ docId: docSelected.id, sectionId: section.id }); // Загружаем rules с db

  //     } else { // Сохраняем rules из активной section
  //       setActiveRules({ docId: docSelected.id, sectionId: section.id }); 
  //     }
  //   }
  // };

  // // Обновление title при редактировании правила
  // const handleEditTitle = (docId, sectionId, newTitle) => {
  //   console.log('docId, sectionId, newTitle: ', docId, ` : `, sectionId, ` : `, newTitle);
  //   // Поиск нужного правила и запись в него

  // };

  // // Обновление тела rule при редактировании правила
  // const handleEditRule = (docId, sectionId, newRule) => {
  //   console.log('docId, sectionId, newRule: ', docId, ` : `, sectionId, ` : `, newRule);
  //   // Поиск нужного правила и запись в него
  // };

  const handleClose = () => {
    if (isChange) {
      // Спросить, есть изменения, выйти без сохранения?
      handleOpenConfirm();
    }
  };

  const handleSubmit = () => {
    // TODO: Сохранить изменения и выйти
  }; 

  
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DialogTitle>Новое правило</DialogTitle>
        <div className={classes.content}>

          <DocumentsModuleRow onDocumentSelected={handleDocSelected} />

          <PositionsModuleRow item={docSelected} type={typePosModule.DOC} />

          <SectionsListModule
            docSelected={docSelected}
            // onSectionSelected={handleSectionSelected}
          />
          
          {/* <RulesModuleRow
            docSelected={docSelected}
            sectionSelected={sectionSelected}
          /> */}


          <div className={classes.cancelSubmitBtn}>
            <CancelSubmitBtn
              onCancel={handleClose}
              onSubmit={handleSubmit}
              disabled={loading || !isChange} loading={loading}
            />
          </div>

          <Confirm
            open={isOpen}
            typeOk={typeConfirm.DEL}
            onOk={handleOkConfirm}
            onCancel={handleCloseConfirm}
            title="Есть не сохранённые данные, выйти без сохранения?"
          />

        </div>
      </Paper>
    </div>
  );
};


RulesContainer.propTypes = {
  loading: pt.bool.isRequired,
  ruleStored: pt.object.isRequired,
  setRuleStored: pt.func.isRequired,
  getAllRulesById: pt.func.isRequired,
  setActiveRules: pt.func.isRequired, 
  // rules: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  ruleStored: state.UI.ruleStored,
  rules: state.data.rules,
});

const mapActionsToProps = {
  setRuleStored,
  getAllRulesById,
  setActiveRules,
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
