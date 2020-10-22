const defaultState = {
    isLoading: false,
    isLoaded: false,
    error: null
  };
  
 
  export const createLoaderReducers = ({
    initialState = defaultState,
    requestActions = [],
    successActions = [],
    failActions = [],
    resetActions = []
  }) => {
    const isLoading = (state = initialState.isLoading, action) => {
      if (requestActions.includes(action.type)) {
        return true;
      } else if (
        successActions.includes(action.type) ||
        failActions.includes(action.type)
      ) {
        return false;
      } else if (resetActions.includes(action.type)) {
        return initialState.isLoading;
      }
  
      return state;
    };
  
    const isLoaded = (state = initialState.isLoaded, action) => {
      if (successActions.includes(action.type)) {
        return true;
      } else if (
        requestActions.includes(action.type) ||
        failActions.includes(action.type)
      ) {
        return false;
      } else if (resetActions.includes(action.type)) {
        return initialState.isLoaded;
      }
  
      return state;
    };
  
    const error = (state = initialState.error, action) => {
      if (failActions.includes(action.type)) {
        return {
          message: action.error.message,
          code: action.error.code
        };
      } else if (
        requestActions.includes(action.type) ||
        successActions.includes(action.type)
      ) {
        return null;
      } else if (resetActions.includes(action.type)) {
        return initialState.error;
      }
  
      return state;
    };
  
    return {
      isLoading,
      isLoaded,
      error
    };
  };