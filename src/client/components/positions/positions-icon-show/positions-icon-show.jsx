import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsPopoverShow from '../positions-popover-show/positions-popover-show';
import PositionsAddInItem from '../positions-add-in-item/positions-add-item';
import { getPositionsByRuleId, getPositionsByDocId, getPositionsByUser } from '../../../utils/utils';
import { typeElem } from '../../../../types';


// Дополнительные должности, которые должны знать данное правило
const PositionsIconShow = ({ type, item, positions }) => {

  const [anchorPos, setAnchorPos] = useState(null);
  const handleShowPosOpen = (e) => setAnchorPos(e.currentTarget);
  const handleShowPosClose = () => setAnchorPos(null);
  const openPos = Boolean(anchorPos);
  
  const [posEdit, setPosEdit] = useState(false);
  const handlePosEditOpen = () => setPosEdit(true);
  const handlePosEditClose = () => setPosEdit(false);

  let title = ``;
  let positionsInItem = []; // Должности закреплённые за item
  
  switch (type) {
    case typeElem.DOC:
      positionsInItem = getPositionsByDocId(item.id, positions);
      break;
    
    case typeElem.RULE:
      positionsInItem = getPositionsByRuleId(item.id, positions);
      break;
    
    case typeElem.EMPLOYEE:
      positionsInItem = getPositionsByUser(item.positions, positions);
      console.log('USER positionsInItem: ', positionsInItem);
      break;
    
    default: break;
  };
  

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
        positions={positionsInItem}
      />
      <PositionsAddInItem
        open={posEdit}
        type={type}
        item={item}
        onClose={handlePosEditClose}
      />
    </>
  );
};


PositionsIconShow.propTypes = {
  type: pt.oneOf([typeElem.DOC, typeElem.RULE, typeElem.RULE]).isRequired,
  item: pt.object.isRequired,
  positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
});

export default connect(mapStateToProps)(PositionsIconShow);
