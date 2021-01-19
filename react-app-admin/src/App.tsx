import React from 'react';
import './styles/app.scss';
import {BrowserRouter} from "react-router-dom";
import { useRoutes } from './root/routes';

const App: React.FC = () => {
    const route = useRoutes();

  return (
      <BrowserRouter>
          {route}
      </BrowserRouter>
  );
}

export default App;
