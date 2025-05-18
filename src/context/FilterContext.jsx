import React, { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const initialState = {
  orgType: '',
  orgs: [],
  source: '',
  sectors: [],
  search: '',
  page: 0,
  limit: 10,
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_ORG_TYPE':
      return { ...state, orgType: action.payload, page: 0 };
    case 'SET_ORGS':
      return { ...state, orgs: action.payload, page: 0 };
    case 'SET_SOURCE':
      return { ...state, source: action.payload, page: 0 };
    case 'SET_SECTORS':
      return { ...state, sectors: action.payload, page: 0 };
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 0 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload, page: 0 };
    case 'RESET_FILTERS':
      return { ...initialState, limit: state.limit };
    default:
      return state;
  }
}

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const value = {
    filters: state,
    setOrgType: (orgType) => dispatch({ type: 'SET_ORG_TYPE', payload: orgType }),
    setOrgs: (orgs) => dispatch({ type: 'SET_ORGS', payload: orgs }),
    setSource: (source) => dispatch({ type: 'SET_SOURCE', payload: source }),
    setSectors: (sectors) => dispatch({ type: 'SET_SECTORS', payload: sectors }),
    setSearch: (search) => dispatch({ type: 'SET_SEARCH', payload: search }),
    setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
    setLimit: (limit) => dispatch({ type: 'SET_LIMIT', payload: limit }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
