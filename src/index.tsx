import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyBMB0VXykFyZxVi5WZ_9wJcjD4w-kCL5n0",
  authDomain: "map-building-project.firebaseapp.com",
  projectId: "map-building-project",
  storageBucket: "map-building-project.appspot.com",
  messagingSenderId: "463562693913",
  appId: "1:463562693913:web:7ce112e1cfc55c7a937988"
};

initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


