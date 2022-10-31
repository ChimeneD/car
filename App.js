import React from 'react';
import Navigation from './routes/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {ContextAPI} from './utils/context';

const App = () => {
  const [bluetoothData, setBluetoothData] = React.useState(null);
  const updataBTData = (data) => {
    setBluetoothData(data);
  }
  return (
    <PaperProvider>
      <ContextAPI.Provider value={{bluetoothData: bluetoothData, updataBTData: updataBTData}}>
        <Navigation />
      </ContextAPI.Provider>
    </PaperProvider>
  );
};

export default App;
