import React from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { getAllRulesById, createRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Icons
// Components
import RuleRow from '../rule-row/rule-row';
import AddIconRow from '../../buttons/add-icon-row/add-icon-row';
import NewRowCreate from '../../buttons/new-row-create/new-row-create';
import { getRulesFromDocAndSection, sortingArr } from '../../../utils/utils';
import { typeElem } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  rows: {
    display: 'flex',
    flexDirection: `column`,
    alignItems: `center`,
    // marginTop: theme.spacing(2),
  },
}));


const RulesListModule = ({ errors, rules, docSelected, section, getAllRulesById, createRule }) => {
  const classes = useStyles();

  const docId = docSelected.id;
  const sectionId = section.id;

  let rulesShow = [];
  
  // Получаем объект с rules для этой секции
  let activeRuleObj = getRulesFromDocAndSection(rules, docId, sectionId); 

  if (!activeRuleObj) { // Проверяем есть ли загруженные данные, если нет - загружаем
    console.log(`Нет загр-х rules - ЗАГРУЖАЕМ`);
    getAllRulesById({ docId, sectionId });

  } else { // Есть загр-е - НЕ загружаем
    rulesShow = sortingArr(activeRuleObj.rules, `order`); // Получаем rules отсортированные по order
    console.log(rulesShow);
  }
  
  return (
    <>
      <div className={classes.rows}>
        {
          rulesShow.length ? <>
            <AddIconRow up type={typeElem.RULE} items={rules} item={rulesShow[0]} onAdd={createRule} />
            {
              rulesShow.map((rule) => <RuleRow key={rule.id}
                rule={rule}
              />)
            }
            </> : <NewRowCreate type={typeElem.RULE} docSelected={docSelected} section={section}/>
        }
      </div>
    </>
  );
};


RulesListModule.propTypes = {
  errors: pt.object.isRequired,
  rules: pt.array.isRequired,
  getAllRulesById: pt.func.isRequired,
  createRule: pt.func.isRequired,
  // activeRules: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  rules: state.data.rules,
  // activeRules: state.data.activeRules,
});

const mapActionsToProps = {
  getAllRulesById,
  createRule,
};

export default connect(mapStateToProps, mapActionsToProps)(RulesListModule);
