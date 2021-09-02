export const QUERY_HOME = "QUERY_HOME";

/**
 *
 * @param movie
 * @returns
 */
const queryHome = (movie: any) => (dispatch: any) => {
  dispatch({
    type: QUERY_HOME,
    payload: movie,
  });
};
