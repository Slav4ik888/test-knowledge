import { updateArrWithItemByField, getArrWithoutItemByField } from './arrays';
import {
  mockArray, mockFieldUpdate, mockArrayUpdated,
  mockArrayWithout1Item, mockArrayWithout2Item, mockArrayWithout3Item
} from '../mocks/forArrays';


describe(`ARRAY.JS - updateArrWithItemByField`, () => {
  it(`Обновляем по полю id`, () => {
    expect(updateArrWithItemByField([...mockArray], `id`, mockFieldUpdate)).toEqual(mockArrayUpdated);
  });

  it(`Обновляем несуществующим объектом, ничего не меняет`, () => {
    expect(updateArrWithItemByField([...mockArray], `id`, {id: `555`})).toEqual(mockArray);
  });
});

describe(`ARRAY.JS - getArrWithoutItemByField`, () => {
  it(`Удаляем по полю id first item`, () => {
    expect(getArrWithoutItemByField([...mockArray], `id`, { id: `111` })).toEqual(mockArrayWithout1Item);
  });

  it(`Удаляем по полю id middle item`, () => {
    expect(getArrWithoutItemByField([...mockArray], `id`, { id: `222` })).toEqual(mockArrayWithout2Item);
  });

  it(`Удаляем по полю id last item`, () => {
    expect(getArrWithoutItemByField([...mockArray], `id`, { id: `333` })).toEqual(mockArrayWithout3Item);
  });

  it(`Ничего не меняет - при удалении не существующего элемента`, () => {
    expect(getArrWithoutItemByField([...mockArray], `id`, { id: `444` })).toEqual(mockArray);
  });

  it(`Ничего не меняет - поле id отсутствует`, () => {
    expect(getArrWithoutItemByField([...mockArray], `id`, { anyField: `111` })).toEqual(mockArray);
  });
});

// describe(``, () => {
//   it(``, () => {
//     expect().toEqual();
//   });
// });

// npm run test arrays.test.js