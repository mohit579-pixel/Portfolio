// Stylesheets first, in cascade order. demos.css is loaded with the demo chunks.
import './styles/global.css';
import './styles/home.css';
import './styles/menu.css';
import './styles/cursor.css';
import './styles/projects.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RouterProvider } from './lib/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
);
