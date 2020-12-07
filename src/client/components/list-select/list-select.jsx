import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Icons
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// Component
import { typeListSelect } from '../../../types';


const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `100%`,
    minWidth: 220,
    color: theme.textSecondary,
  },
  docSelected: {
    fontSize: theme.fontSize.document,
    fontColor: theme.palette.fontColor.document,
    fontWeight: theme.fontWeight.document,
  },
  sectionSelected: {
    fontSize: theme.fontSize.section,
    fontColor: theme.palette.fontColor.section,
    fontWeight: theme.fontWeight.section,
  },
  lastItem: {
    color: theme.palette.primary.dark,
    fontStyle: `italic`,
  },
  addIcon: {
    marginRight: theme.spacing(2),
  }
}));


const ListSelect = ({ type, items, valueField, title, placeholder, label, onSelected, onItemAdd, itemTextAdd, disabled }) => {

  const classes = useStyles();

  const icon = type === `addUser` ? <PersonAddIcon className={classes.addIcon} /> : <AddIcon className={classes.addIcon} />;
  const classSelected = type === typeListSelect.DOC ? classes.docSelected : classes.sectionSelected;

  const [valueSelected, setValueSelected] = useState(placeholder);

  const handleChange = (e) => {
    const id = e.target.value;
    const item = items.find(item => item[valueField] === id);
    if (item) {
      setValueSelected(item[valueField]);
    } else {
      setValueSelected(placeholder);
    }
    onSelected(item);
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      disabled={disabled}
    >
      {title && <InputLabel id={`${label}-label`}>{title}</InputLabel>}

      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={valueSelected}
        onChange={handleChange}
        input={<Input />}
        className={classSelected}
      >
        <MenuItem value={`Не указан`}><em>Не указан</em></MenuItem>
        {
          items && items.map((item, i) => <MenuItem key={item[valueField] + i} value={item[valueField]}>
              {item[valueField]}
            </MenuItem>
          )
        }
        {
          onItemAdd && <MenuItem value={`newItemAdd`} onClick={onItemAdd} className={classes.lastItem}>
            {icon}
            {itemTextAdd ? itemTextAdd : `добавить новый`}
          </MenuItem>
        }
      </Select>
    </FormControl>
  )
};

ListSelect.propTypes = {
  type: pt.string,
  title: pt.string,
  valueField: pt.string.isRequired,
  placeholder: pt.string.isRequired,
  label: pt.string.isRequired,
  items: pt.array,
  onSelected: pt.func.isRequired,
  onItemAdd: pt.func,
  itemTextAdd: pt.string,
  disabled: pt.bool,  
};

export default ListSelect;
