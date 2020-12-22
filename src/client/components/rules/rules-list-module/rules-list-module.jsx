import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { getAllRulesById } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import RuleRow from '../rule-row/rule-row';
import RuleRowCreate from '../rule-row-create/rule-row-create';
import { getRulesFromDocAndSection, sortingArr } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  rows: {
    display: 'flex',
    flexDirection: `column`,
    alignItems: `center`,
    marginTop: theme.spacing(2),
  },
}));


const RulesListModule = ({ loading, rules, docSelected, section, getAllRulesById }) => {
  
  const classes = useStyles();

  const docId = docSelected.id;
  const sectionId = section.id;

  let rulesShow = [];
  // Получаем объект с rules для этой секции
  let activeRuleObj = getRulesFromDocAndSection(rules, docId, sectionId); 
  console.log('activeRuleObj: ', activeRuleObj);

  if (!activeRuleObj) { // Проверяем есть ли загруженные данные, если нет - загружаем
    console.log(`Нет загр-х - ЗАГРУЖАЕМ`);
    getAllRulesById({ docId, sectionId });

  } else {
    console.log(`Есть загр-е - НЕ загружаем`);
    // Получаем rules отсортированные по order
    rulesShow = sortingArr(activeRuleObj.rules, `order`);
  }
  
  console.log('rulesShow: ', rulesShow);
  

  return (
    <>
      <div className={classes.rows}>
        {
          loading && <CircularProgress />
        }
        {
          rulesShow.length ?
            rulesShow.map((rule) => <RuleRow key={rule.id}
              rule={rule}
            />)
            : <RuleRowCreate docSelected={docSelected} section={section}/>
        }
      </div>
    </>
  );
};


RulesListModule.propTypes = {
  loading: pt.bool.isRequired,
  rules: pt.array.isRequired,
  getAllRulesById: pt.func.isRequired,
  // activeRules: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  rules: state.data.rules,
  // activeRules: state.data.activeRules,
});


export default connect(mapStateToProps, { getAllRulesById })(RulesListModule);
