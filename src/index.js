import React from 'react';
import ReactDOM from 'react-dom/client';
import Gallery from './components/Gallery';
import GlobalStyles from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Gallery />
  </React.StrictMode>
);
