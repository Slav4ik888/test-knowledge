import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { getRulesAndQuestionsByPositionId, updateTestData } from '../../../redux/actions/data-actions';
import * as s from '../../../redux/selectors/data-selectors';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import ListSelect from '../../list-select/list-select';
import TestContainerQuestions from '../test-container-questions/test-container-questions';
import { getPositionsByUser } from '../../../utils/utils';
import { getItemFromArrByField } from '../../../utils/arrays';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexDirection: `column`,
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.bodyfield,
    minHeight: `300px`,
  },
}));


// Запуск тестирования - выбор должности
const TestSelectPosition = ({ open, onClose, loading, allPositions, userEmail, employees,
  getRulesAndQuestionsByPositionId, testData, rulesForTest, updateTestData }) => {
  
  if (!open) return null;
  
  const classes = useStyles();

  const userPositions = employees.find(employee => employee.email === userEmail).positions;
  const positions = getPositionsByUser(userPositions, allPositions);

  const placeholder = `Не выбрана`;
  const listTitle = `Должность для тестирования`;

  let docsInPos = []; // Документы закреплённые за выбранной должности
  let rulesInPos = []; // Отдельные правила закреплённые за выбранной должностью
  let allRules = []; // Итоговый список всех правил для выбранной должности

  
  // Выбранная должность для тестирования
  const [posSeleted, setPosSelected] = useState(null);
  console.log('posSeleted: ', posSeleted);
  const positionText = posSeleted ? `` : `Выберите должность для тестирования`;

  const handleSetPosSelected = (pos) => {
    console.log('pos: ', pos);

    if (pos) {
      if (!getItemFromArrByField(rulesForTest, `positionId`, pos.id)) {
        console.log(`Нет загруженных rules для position ${pos.id}. ЗАГРУЖАЕМ`);

        docsInPos = pos.documents; // Документы закреплённые за выбранной должности
        console.log('docsInPos: ', docsInPos);

        rulesInPos = pos.rules; // Отдельные правила закреплённые за выбранной должностью
        console.log('rulesInPos: ', rulesInPos);
        // Загружаем rules & questions по всем закреплённым за должностью документам и отдельным rules
        getRulesAndQuestionsByPositionId(pos.id, docsInPos, rulesInPos);

      } else { // Если уже загружали данные для должности, то просто включаем флажок тестирования
        updateTestData({ testReady: true });
      }
    }

    setPosSelected(pos);
    
  };

  // Закрыли тестирование
  const handleClose = () => {
    updateTestData({ // Отключаем тестирование
      testReady: false,
      questionsAll: 0,
      questionsRest: 0,
      errorValue: 0,
      timeStart: 0, 
      timeEnd: 0,
    }); 

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

          {
            positionText && <Typography variant="h5" color="primary" className={classes.title}>
              {positionText}
            </Typography>
          }
          {
            !testData.testReady && <ListSelect
              type={typeListSelect.POSITION}
              title={listTitle}
              items={positions}
              valueField={`title`}
              label={`positions`}
              placeholder={placeholder}
              onSelected={handleSetPosSelected}
            />
          }

          {
            loading ? <CircularProgress size={30} className={classes.progress} />
              : <TestContainerQuestions position={posSeleted ? posSeleted : {}} />
          }

        </DialogContent>
      </Dialog>
    </>
  );
}

TestSelectPosition.propTypes = {
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  loading: pt.bool.isRequired,
  allPositions: pt.array.isRequired,
  userEmail: pt.string,
  employees: pt.array.isRequired,
  getRulesAndQuestionsByPositionId: pt.func.isRequired,
  testData: pt.object.isRequired,
  rulesForTest: pt.array.isRequired,
  updateTestData: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  userEmail: state.user.userProfile.email,
  testData: s.getTestData(state),
  employees: s.getEmployees(state),
  allPositions: s.getPositions(state),
  rulesForTest: s.getRulesForTest(state),
});

const mapActionsToProps = {
  getRulesAndQuestionsByPositionId,
  updateTestData,
};

export default connect(mapStateToProps, mapActionsToProps)(TestSelectPosition);
