import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import RuleRow from '../rule-row/rule-row';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
  },
}));


const RulesModuleRow = ({ loading, docSelected, sectionSelected, rulesInSection }) => {
  console.log('rulesInSection: ', rulesInSection);
  console.log('docSelected: ', docSelected);
  console.log('sectionSelected: ', sectionSelected);
  if (!sectionSelected) return null;
  if (loading) return <CircularProgress />;

  const classes = useStyles();

  // const rulesShow = rules.find((rule) => rule.docId === docSelected.id && rule.sectionId === sectionSelected.id).rules;

  return (
    <>
      <div className={classes.row}>
        {
          rulesInSection.length ? rulesInSection.map((rule) => <RuleRow key={rule.id} rule={rule} />)
          : <RuleRow rule={null} />
        }
      </div>
    </>
  );
};


RulesModuleRow.propTypes = {
  loading: pt.bool.isRequired,
  docSelected: pt.object,
  sectionSelected: pt.object,
  // onSectionSelected: pt.func.isRequired,
  ruleStored: pt.object,
  rulesInSection: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
  loading: state.UI.loading,
  // rules: state.data.rules,
});


export default connect(mapStateToProps)(RulesModuleRow);
