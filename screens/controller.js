import React from 'react';
import {View} from 'react-native';
import { Text, Button } from 'react-native-paper';
import useBLE from "../hooks/useBLE"

const ControllerScreen = () => {
  const { sendData } = useBLE()
  const coordinates = `{"lng":31.12323123,"lat":18.21321232}`;
  return (
    <View>
      <Text>ControllerScreen</Text>
      <Button onPress={()=>sendData("F")}>Forward</Button>
      <Button onPress={()=>sendData("B")}>Backward</Button>
      <Button onPress={()=>sendData("L")}>Left</Button>
      <Button onPress={()=>sendData("R")}>Right</Button>
      <Button onPress={()=>sendData("S")}>Stop</Button>
      <Button onPress={()=>sendData("A")}>Switch to Automatic</Button>
      <Button onPress={()=>sendData("M")}>Switch to Manual</Button>
      <Button onPress={()=>sendData(coordinates)}>Send Coordinates</Button>
    </View>
  );
};

export default ControllerScreen;
