import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Component

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: `100%`,
    minWidth: 220,
  },
}));


const ListSelect = ({ items, valueField, title, placeholder, label, onSelected, disabled }) => {
  // if (disabled) return null;

  const classes = useStyles();

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
      <InputLabel id={`${label}-label`}>{title}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={valueSelected}
        onChange={handleChange}
        input={<Input />}
      >
        <MenuItem value={placeholder}><em>Не указан</em></MenuItem>
        {
          items && items.map((item) => <MenuItem key={item.id} value={item[valueField]}>
              {item[valueField]}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
};

ListSelect.propTypes = {
  title: pt.string.isRequired,
  valueField: pt.string.isRequired,
  placeholder: pt.string.isRequired,
  label: pt.string.isRequired,
  items: pt.array,
  onSelected: pt.func.isRequired,
  disabled: pt.bool,  
};

export default ListSelect;
