import React from 'react';
import {View} from 'react-native';
import { Text, Button } from 'react-native-paper';
import useBLE from "../hooks/useBLE"

const ControllerScreen = () => {
  const { sendData } = useBLE()
  return (
    <View>
      <Text>ControllerScreen</Text>
      <Button onPress={()=>sendData("1")}>Send Data</Button>
    </View>
  );
};

export default ControllerScreen;
