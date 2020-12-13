import React from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff

// Component
import SectionsModuleRow from '../sections-module-row/sections-module-row';
import { sortingArr } from '../../../utils/utils';

// В открытом document выводит список всех section в виде модулей с вложенными rules
const SectionsListModule = ({ docSelected }) => {
  if (!docSelected) return null;

  // Получаем sections отсортированные по order
  const sectionsShow = sortingArr(docSelected.sections, `order`);

  return (
    <>
      {
        sectionsShow.length &&
          sectionsShow.map((section) => <SectionsModuleRow key={section.id}
              section={section}
              docSelected={docSelected}
            />)
      }

    </>
  );
}

SectionsListModule.propTypes = {
  docSelected: pt.object,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});


export default connect(mapStateToProps)(SectionsListModule);
