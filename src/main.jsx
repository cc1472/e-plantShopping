import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import Provider from react-redux to make the Redux store available to the app
import { Provider } from 'react-redux';
// Import the configured Redux store
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the App component with Provider and pass the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
