import React from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
// Icons
import DoneIcon from '@material-ui/icons/Done';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  column: {
    flexDirection: `column`,
  },
  chip: {
    margin: theme.spacing(0.5),
    color: `#013253`,
  },
}));

const PositionsListChip = ({ positions, column }) => {
  const classes = useStyles();
  const newClassName = cl(classes.root, { [classes.column]: column });

  return (
    <>
      <List height={100} component="ul" className={newClassName}>
        {
          positions.length ? positions.map((pos) => <li key={pos.id}>
              <Chip
                icon={<SupervisedUserCircleIcon />}
                deleteIcon={<DoneIcon />}
                label={pos.title}
                variant="outlined"
                size="small"
                clickable
                // color="default"
                onDelete={() => {}}
                className={classes.chip}
              />
            </li>
          )
            : `Нет закреплённых должностей`
        }
      </List> 
    </>
  );
}

PositionsListChip.propTypes = {
  positions: pt.array.isRequired,
  column: pt.bool,
  // children: pt.oneOfType([
  //   pt.arrayOf(pt.node),
  //   pt.node
  // ]).isRequired
};

export default PositionsListChip;
