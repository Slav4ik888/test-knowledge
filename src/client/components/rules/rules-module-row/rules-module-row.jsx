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
import RuleRowAdd from '../rule-row-add/rule-row-add';
import { getRulesFromDocAndSection } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  rows: {
    display: 'flex',
    flexDirection: `column`,
    alignItems: `center`,
    marginTop: theme.spacing(2),
  },
}));


const RulesModuleRow = ({ loading, onEditTitle, onEditRule, rules, activeRules: {docId, sectionId} }) => {
  
  if (!sectionId) return null;
  if (loading) return <CircularProgress />;

  console.log('rules: ', rules);
  console.log('activeRules: ', docId, ` : `, sectionId);
  const classes = useStyles();

  let rulesShow = [];
  let activeRuleObj = getRulesFromDocAndSection(rules, docId, sectionId); //rules.find((rule) => rule.docId === docId && rule.sectionId === sectionId);

  console.log('activeRuleObj: ', activeRuleObj);
  if (activeRuleObj) {
    rulesShow = rulesShow.concat(activeRuleObj.rules);
  };
  console.log('rulesShow: ', rulesShow);
  
  const handleAddRule = () => {
    // TODO: Добавление нового RuleRow
  };

  return (
    <>
      <div className={classes.rows}>
        {
          rulesShow.length ?
            rulesShow.map((rule) => <RuleRow key={rule.id}
              rule={rule}
              // onEditTitle={onEditTitle}
              // onEditRule={onEditRule}
            />)
            : null
        }
        <RuleRowAdd onAdd={handleAddRule} />
      </div>
    </>
  );
};


RulesModuleRow.propTypes = {
  loading: pt.bool.isRequired,
  // onEditRule: pt.func.isRequired,
  // onEditTitle: pt.func.isRequired,
  // ruleStored: pt.object,
  rules: pt.array.isRequired,
  activeRules: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  // ruleStored: state.UI.ruleStored,
  loading: state.UI.loading,
  rules: state.data.rules,
  activeRules: state.data.activeRules,
});


export default connect(mapStateToProps)(RulesModuleRow);
