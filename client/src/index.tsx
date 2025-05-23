import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
// import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from "./reportWebVitals";
import App from './App';
import { store, persistor } from './redux/store';

// Function to load the Google Maps API
const loadGoogleMapsAPI = (callback: () => void) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzUn0CKCVkUOaJtzzw16qT3QTSfPTtS6Q&libraries=places`;
    script.id = 'googleMaps';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

const RootComponent = () => {
  useEffect(() => {
    loadGoogleMapsAPI(() => {
      console.log('Google Maps API has been loaded');
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};

// Render the root component
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RootComponent />);






















//new

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();













// import React from 'react';
// import { Provider } from 'react-redux';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { PersistGate } from 'redux-persist/integration/react';
// // import * as serviceWorker from "./serviceWorker";
// // import reportWebVitals from "./reportWebVitals";
// import App from './App';
// import { store, persistor } from './redux/store';

// // ----------------------------------------------------------------------

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <HelmetProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </HelmetProvider>
//     </PersistGate>
//   </Provider>
// );

// //new

// // If you want to enable client cache, register instead.
// // serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
