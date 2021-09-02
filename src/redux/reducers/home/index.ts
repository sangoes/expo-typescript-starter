import { QUERY_HOME } from "@/redux/actions/home/index";

const initialState = {
  movies: [],
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case QUERY_HOME:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
