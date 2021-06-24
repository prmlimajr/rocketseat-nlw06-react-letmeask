import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AppProvider } from './hooks';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
