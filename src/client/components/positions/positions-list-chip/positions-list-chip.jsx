import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
// Icons
import DoneIcon from '@material-ui/icons/Done';
// Components


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

const PositionsListChip = ({ positions }) => {
  const classes = useStyles();

  return (
    <>
      <List height={100} component="ul" className={classes.root}>
        {
          positions.length ? positions.map((pos) => <li key={pos.id}>
              <Chip
                // icon={icon}
                deleteIcon={<DoneIcon />}
                label={pos.title}
                // onDelete={() => {}}
                className={classes.chip}
              />
          </li>)
            : `Нет закреплённых должностей`
        }
      </List> 
    </>
  );
}

PositionsListChip.propTypes = {
  positions: pt.array.isRequired,
  // children: pt.oneOfType([
  //   pt.arrayOf(pt.node),
  //   pt.node
  // ]).isRequired
};

export default PositionsListChip;
