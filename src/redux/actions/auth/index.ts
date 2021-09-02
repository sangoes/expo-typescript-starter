export const ADD_FAVORITE_ITEM = "ADD_FAVORITE_ITEM";

const removeFavorite = (movie: any) => (dispatch: any) => {
  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: movie,
  });
};
