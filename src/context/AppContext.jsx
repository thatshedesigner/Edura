import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem('edura_bookmarks')) || [],
  compareList: [], // Max 3 items
  interests: JSON.parse(localStorage.getItem('edura_interests')) || [],
  recentSearches: JSON.parse(localStorage.getItem('edura_recent_searches')) || []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_BOOKMARK': {
      const exists = state.bookmarks.find(b => b.id === action.payload.id);
      const newBookmarks = exists 
        ? state.bookmarks.filter(b => b.id !== action.payload.id)
        : [...state.bookmarks, action.payload];
      localStorage.setItem('edura_bookmarks', JSON.stringify(newBookmarks));
      return { ...state, bookmarks: newBookmarks };
    }
    case 'TOGGLE_COMPARE': {
      const exists = state.compareList.find(c => c.id === action.payload.id);
      if (exists) {
        return { ...state, compareList: state.compareList.filter(c => c.id !== action.payload.id) };
      }
      if (state.compareList.length >= 3) return state; // Limit max 3 
      return { ...state, compareList: [...state.compareList, action.payload] };
    }
    case 'SET_INTERESTS': {
      localStorage.setItem('edura_interests', JSON.stringify(action.payload));
      return { ...state, interests: action.payload };
    }
    case 'ADD_SEARCH': {
      const filtered = state.recentSearches.filter(s => s !== action.payload);
      const newRecent = [action.payload, ...filtered].slice(0, 5);
      localStorage.setItem('edura_recent_searches', JSON.stringify(newRecent));
      return { ...state, recentSearches: newRecent };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
