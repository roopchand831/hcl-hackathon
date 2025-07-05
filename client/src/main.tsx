import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import {thunk } from 'redux-thunk';
import { userLoginReducer, userRegistraterReducer } from './store/reducers/authReducers.ts';

// Define the rootReducer with correct names
const rootReducer = combineReducers({
  signin: userRegistraterReducer, // you can adjust names for clarity
  login: userLoginReducer,
});

// Adjust the composeEnhancers logic to prevent unwanted fallbacks
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);