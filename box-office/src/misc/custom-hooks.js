import { useReducer, useEffect, useState } from 'react';
import { apiGet } from './config';

// REducer function with actions specified
function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

// Custom wrapper hook - To read and write to the browser local storage
function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  // Whenever the state changes this will run - synchronizing the state with local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

// Custom Hook to persist the data in Search box - by writing the value to session storage
export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return {
        isLoading: false,
        error: null,
        show: action.show,
      };
    }

    case 'FETCH_FAILED':
      return { ...prevState, isLoading: false, error: action.error };

    default:
      return prevState;
  }
};

// Custom hook for show page- for reusability purpose moved from Show.js
export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  // As the id is static we can use that in dependancies array
  useEffect(() => {
    // As the state needs to be updated only when ths component is mounted
    const isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
  }, [showId]);
  return state;
}
