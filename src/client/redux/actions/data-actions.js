import {dataActionType} from '../types';

// Get all screams
// export const getScreams = () => (dispatch) => {
//   console.log(`11: `, axios.defaults.headers);
//   dispatch({ type: dataActionType.LOADING_DATA });
//   return axios.get(`/screams`)
//     .then((res) => {
//       console.log(`res: `, res.data);
//       dispatch({
//         type: dataActionType.SET_SCREAMS,
//         payload: res.data,
//       });
        
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: dataActionType.SET_SCREAMS,
//         payload: [],
//       })
//     });
// };

// Like a scream
// export const likeScream = (screamId) => (dispatch) => {
//   return axios.get(`/scream/${screamId}/like`)
//     .then((res) => {
//       console.log(`likeScream res.data: `, res.data);
//       dispatch({
//         type: dataActionType.LIKE_SCREAM,
//         payload: res.data,
//       })
//     })
//     .catch((err) => console.log(err));
// };
