import React from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff

// Component
import SectionsModuleRow from '../sections-module-row/sections-module-row';
import { sortingArr } from '../../../utils/utils';

// В открытом document выводит список всех section в виде модулей с вложенными rules
const SectionsListModule = ({ docSelected, documents }) => {
  
  if (!docSelected) return null;
  
  const document = documents.find((doc) => doc.id === docSelected.id);
  // Получаем sections отсортированные по order
  // const sectionsShow = sortingArr(docSelected.sections, `order`);
  let sectionsShow;
  if (document) {
    sectionsShow = sortingArr(document.sections, `order`);
  }

  return (
    <>
      {
        sectionsShow && sectionsShow.length &&
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
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  documents: state.data.documents,
});


export default connect(mapStateToProps)(SectionsListModule);
