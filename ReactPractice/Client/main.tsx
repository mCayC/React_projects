import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { routes } from './components/routes';


export const App = () : JSX.Element => {
  
  return <BrowserRouter children={routes} />
}

