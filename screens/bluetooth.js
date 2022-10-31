import * as React from 'react';
import useBLE from '../hooks/useBLE';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../utils/colors';

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

  const connect = device => {
    if (connectToDevice(device)) {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please Connect to the Car</Text>
      {allDevices.map(device => {
        return (
          <TouchableOpacity key={device.id} onPress={() => connect(device)}>
            <Button mode="contained" style={styles.btn} color={secondary}>
              Connect to `{device.name}`
            </Button>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity onPress={openModal}>
        <Button style={styles.btn_out} color={secondary}>
          Scan For Devices
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const {background, secondary, tertiary} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
  },
   btn: {
    width: Dimensions.get('window').width - 80,
    marginTop: 5,
    marginBottom: 10,
  },
  btn_out: {
    backgroundColor: '#252525',
    width: Dimensions.get('window').width - 80,
  },
  text: {
    fontSize: 20,
    marginBottom: 15
  }
});
