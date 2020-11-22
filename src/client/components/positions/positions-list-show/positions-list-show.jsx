import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
// import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
// Icons
import DoneIcon from '@material-ui/icons/Done';
// Components
// import PositionItem from '../position-item/position-item';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: `column`,
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
const PositionsListShow = ({ open, anchorEl, positions, onClose }) => {
  console.log('positions: ', positions);
  const classes = useStyles();
  console.log('anchorEl: ', anchorEl);

  return (
    <>
      <Popover 
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List height={100} component="ul" className={classes.root}>
          {
            positions.length ? positions.map((pos) => <li key={pos.id}>
                <Chip
                  // icon={icon}
                  deleteIcon={<DoneIcon />}
                  label={pos.title}
                  onDelete={() => {}}
                  className={classes.chip}
                />
            </li>)
              : `Нет закреплённых должностей`
          }
        </List> 
      </Popover>
      
    </>
  );
}

PositionsListShow.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  positions: pt.array.isRequired,
};

// const mapStateToProps = (state) => ({
//   positions: state.data.positions,
// });

// export default connect(mapStateToProps)(PositionsListShow);
export default PositionsListShow;
