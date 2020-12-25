import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsPopoverShow from '../../positions/positions-popover-show/positions-popover-show';
import PositionsAddInItem from '../../positions/positions-add-in-item/positions-add-item';
import { getPositionsByRuleId } from '../../../utils/utils';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  
}));

// Дополнительные должности, которые должны знать данное правило
const RulePositions = ({ rule, positions }) => {
  console.log('positions: ', positions);

  const classes = useStyles();

  const [anchorPos, setAnchorPos] = useState(null);
  const handleShowPosOpen = (e) => setAnchorPos(e.currentTarget);
  const handleShowPosClose = () => setAnchorPos(null);
  const openPos = Boolean(anchorPos);
  
  const [posEdit, setPosEdit] = useState(false);
  const handlePosEditOpen = () => setPosEdit(true);
  const handlePosEditClose = () => setPosEdit(false);


  return (
    <>
      <div
        onMouseEnter={handleShowPosOpen} onMouseLeave={handleShowPosClose}
        onClick={handlePosEditOpen}
      >
        <Tooltip title="Изменить список закреплённых должностей" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton edge="end" aria-label="Positions">
            <SupervisedUserCircleIcon />
          </IconButton>
        </Tooltip>
      </div>
        
      <PositionsPopoverShow
        open={openPos}
        anchorEl={anchorPos}
        onClose={handleShowPosClose}
        positions={getPositionsByRuleId(rule.id, positions)}
      />
      <PositionsAddInItem
        open={posEdit}
        type={typePosModule.RULE}
        item={rule}
        onClose={handlePosEditClose}
      />
    </>
  );
};


RulePositions.propTypes = {
  rule: pt.object.isRequired,
  // updateRule: pt.func.isRequired,  
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
});

const mapActionsToProps = {
  // updateRule,
};

export default connect(mapStateToProps, mapActionsToProps)(RulePositions);
