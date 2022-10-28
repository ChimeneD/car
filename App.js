import React from 'react';
import Navigation from './routes/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {ContextAPI} from './utils/context';

const App = () => {
  return (
    <PaperProvider>
      <ContextAPI.Provider value={{mode: 0}}>
        <Navigation />
      </ContextAPI.Provider>
    </PaperProvider>
  );
};

export default App;
