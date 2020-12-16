import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
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


const RulesListModule = ({ loading, rules, docSelected, section }) => {
  
  // if (!sectionId) return null;
  // if (loading) return <CircularProgress />;

  const classes = useStyles();

  let rulesShow = [];
  // Получаем объект с правилами для секции
  let activeRuleObj = getRulesFromDocAndSection(rules, docSelected.id, section.id); 
  console.log('activeRuleObj: ', activeRuleObj);


  if (activeRuleObj) {
    // Получаем rules отсортированные по order
    rulesShow = sortingArr(activeRuleObj.rules, `order`);
  };
  console.log('rulesShow: ', rulesShow);
  

  return (
    <>
      <div className={classes.rows}>
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
  // activeRules: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  rules: state.data.rules,
  // activeRules: state.data.activeRules,
});


export default connect(mapStateToProps)(RulesListModule);
