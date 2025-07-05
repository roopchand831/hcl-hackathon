// src/services/NavigationService.ts
import { createBrowserHistory } from "history";

// Create a history object using createBrowserHistory
const history = createBrowserHistory();

// Export the history object for use throughout your app
export const navigate = (path: string) => {
  history.push(path); // Programmatically navigate to a different route
};

// Export the history object so it can be used in the Router
export default history;
