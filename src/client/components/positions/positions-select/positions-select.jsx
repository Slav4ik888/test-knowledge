import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePositions, updatePositionsServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
// Component
import PositionsList from '../positions-list/positions-list';
import PositionAdd from '../position-add/position-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


const useStyles = makeStyles((theme) => ({
  
}));

const PositionsSelect = ({ open, onClose, UI: { loading, errors, messages }, positions }) => {

  if (!open) {
    return null;
  }


  return (
    <>
      
    </>
  );
}

PositionsSelect.propTypes = {
  // updatePositions: pt.func.isRequired,
  // updatePositionsServer: pt.func.isRequired,
  // open: pt.bool.isRequired,
  // onClose: pt.func.isRequired,
  // UI: pt.object.isRequired,
  // positions: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  // UI: state.UI,
  // positions: state.data.positions,
});
const mapActionsToProps = {
  
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsSelect);
