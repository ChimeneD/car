import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {btoa} from 'react-native-quick-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bleManager = new BleManager();

export default useBLE = () => {
  const [allDevices, setAllDevices] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [connectedDevice, setConnectedDevice] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('device');
        return jsonValue != null
          ? setConnectedDevice(JSON.parse(jsonValue))
          : setConnectedDevice(null);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    })();
  }, []);

  const scanAndConnect = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      console.log('Scanning...');
      console.log(device);
      if (error) {
        console.log(error.message);
        return false;
      }
      if (device.name === 'gps_car') {
        console.log('Connecting to Tappy');
        bleManager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            console.log('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            console.log(device.id);
            saveDevice(device);
            return true;
            // device.writeCharacteristicWithResponseForService('12ab', '34cd', 'aGVsbG8gbWlzcyB0YXBweQ==')
            //   .then((characteristic) => {
            //     console.log(characteristic.value);
            //     return
            //   })
          })
          .catch(error => {
            console.log(error.message);
            return false;
          });
      }
    });
  };
  const connectToDevice = async device => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      if (deviceConnection) setConnectedDevice(deviceConnection);
      setIsConnected(true);
      saveDevice(deviceConnection);
      bleManager.stopDeviceScan();
      return true;
    } catch (e) {
      console.log('ERROR WHEN CONNECTING ', e);
      return false;
    }
  };
  const requestPermissions = async callback => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);

      callback(PermissionsAndroid.RESULTS.GRANTED === 'granted');
    } else {
      callback(true);
    }
  };
  // check for duplicate device
  const isDuplicateDevice = (devices, nextDevice) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;
  // scan for devices
  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes('CAR')) {
        // add device
        setAllDevices(prevState => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };
  // start streaming data
  const startStreamingData = async device => {
    if (device) {
      device.monitorCharacteristicForService('', '', () => {});
    } else {
      console.error('NO DEVICE CONNECTED');
    }
  };
  const sendData = async message => {
    try {
      const base64 = btoa(message);
      if (!bleManager.isDeviceConnected(connectedDevice.id)) {
        console.log('not connected');
        bleManager
          .connectToDevice(connectedDevice.id, {
            refreshGatt: 'OnConnected',
          })
          .then(device => {
            console.log('Discovering services and characteristics');
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(device => {
            console.log(device.id);
            bleManager
              .writeCharacteristicWithResponseForDevice(
                device.id,
                '0000101d-0000-1000-8000-00805f9b34fb',
                '000001ab-0000-1000-8000-00805f9b34fb',
                `${base64}`,
              )
              .then(characteristic => {
                console.log(characteristic.value);
                return;
              })
              .catch(error => {
                console.log('Write Error => ', error.message);
              });
          })
          .catch(error => {
            // Handle errors
            console.log(error.message);
          });
      } else {
        console.log('connected');
        console.log('Discovering services and characteristics');
        return bleManager
          .discoverAllServicesAndCharacteristicsForDevice(connectedDevice.id)
          .then(device => {
            console.log(device.id);
            bleManager
              .writeCharacteristicWithoutResponseForDevice(
                device.id,
                '0000101d-0000-1000-8000-00805f9b34fb',
                '000001ab-0000-1000-8000-00805f9b34fb',
                `${base64}`,
              )
              .then(characteristic => {
                console.log(characteristic.value);
                return;
              })
              .catch(error => {
                console.log('Write Error => ', error.message);
              });
          });
      }
    } catch (e) {
      console.log(e.message);
    }
    // UUID 101D
    // CHAR 01AB
  };
  const saveDevice = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('device', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    isConnected,
    requestPermissions,
    sendData,
    scanForDevices,
    scanAndConnect,
  };
};
