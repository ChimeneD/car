import * as React from 'react';
import useBLE from '../hooks/useBLE';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../utils/colors';

export default BlueToothScreen = ({navigation}) => {
  //const [isModalVisible, setIsModalVisible] = React.useState(false);
  const {requestPermissions, scanForDevices, allDevices, connectToDevice} =
    useBLE();

  const openModal = async () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevices();
      }
    });
  };

  const connect = (device) => {
    if (connectToDevice(device)) {
      navigation.navigate("Home");
    }
  }
  return (
    <View style={styles.container}>
      <Text>Please Connect to the Car</Text>
      {allDevices.map(device => {
        return (
          <TouchableOpacity
            key={device.id}
            onPress={() => connect(device)}>
            <Button mode="contained">{device.name}</Button>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity onPress={openModal}>
        <Button>Scan For Devices</Button>
      </TouchableOpacity>
    </View>
  );
};

const {background} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: background
  }
})