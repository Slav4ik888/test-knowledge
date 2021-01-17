import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { getRulesByArrayOfDocsId } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import ListSelect from '../../list-select/list-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPositionsByUser } from '../../../utils/utils';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.bodyfield,
    minHeight: `300px`,
  },
}));


// Запуск тестирования
const TestsContainerExecute = ({ open, onClose, loading, allPositions, userEmail, employees, getRulesByArrayOfDocsId }) => {
  
  if (!open) return null;
  
  const classes = useStyles();

  const userPositions = employees.find(employee => employee.email === userEmail).positions;
  const positions = getPositionsByUser(userPositions, allPositions);

  const placeholder = `Не выбрана`;
  const listTitle = `Должность для тестирования`;

  let allDocumentsInPosition = []; // Документы закреплённые за выбранной должности
  let allRulesInPosition = []; // Отдельные правила закреплённые за выбранной должностью
  let allRules = []; // Итоговый список всех правил для выбранной должности
  // Выбранная должность для тестирования
  const [posSeleted, setPosSelected] = useState(null);
  console.log('posSeleted: ', posSeleted);
  const handleSetPosSelected = (pos) => {
    console.log('pos: ', pos);

    if (pos) {
      allDocumentsInPosition = pos.documents; // Документы закреплённые за выбранной должности
      console.log('allDocumentsInPosition: ', allDocumentsInPosition);

      allRulesInPosition = pos.rules; // Отдельные правила закреплённые за выбранной должностью
      console.log('allRulesInPosition: ', allRulesInPosition);

      getRulesByArrayOfDocsId(allDocumentsInPosition); // Загружаем правила для тестирования
    }

    setPosSelected(pos);
  };

  
  // Получить правила по всем закреплённым документам за должностью
  // Сформировать [{documentId, sectionId}, {}, ...] по documentId из position
  // allDocumentsId.forEach((documentId) => getAllRulesById/:documentId/:sectionId );
  // Сохранить в test-reducer.js

  // Получить индивидуальные правила закреплённые за должностью
  // allRulesId.forEach((ruleId) => getRule/:ruleId );

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Тестирование</DialogTitle>

        <DialogContent dividers className={classes.container} >
          
          <ListSelect
            type={typeListSelect.POSITION}
            title={listTitle}
            items={positions}
            valueField={`title`}
            label={`positions`}
            placeholder={placeholder}
            onSelected={handleSetPosSelected}
          />

          {
            loading && <CircularProgress size={30} className={classes.progress} />
          }
          
        </DialogContent>
      </Dialog>
    </>
  );
}

TestsContainerExecute.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  loading: pt.bool.isRequired,
  allPositions: pt.array.isRequired,
  userEmail: pt.string,
  employees: pt.array.isRequired,
  getRulesByArrayOfDocsId: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  // userPositions: state.user.userProfile.positions,
  userEmail: state.user.userProfile.email,
  employees: state.data.employees,
  allPositions: state.data.positions,
});

const mapActionsToProps = {
  getRulesByArrayOfDocsId,
  // updateDocument,
  // deleteDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(TestsContainerExecute);
