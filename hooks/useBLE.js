import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

const bleManager = new BleManager();

export default useBLE = () => {
  const [allDevices, setAllDevices] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [connectedDevice, setConnectedDevice] = React.useState(null);
  const connectToDevice = async device => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      setIsConnected(true);
      bleManager.stopDeviceScan();
      return true;
    } catch (e) {
      console.log('ERROR WHEN CONNECTING ', e);
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
      if (device && device.name?.includes('GPS_CAR')) {
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
  const sendData = async (message) => {
  //  device.writeCharacteristicWithResponseForService('12ab', '34cd', 'aGVsbG8gbWlzcyB0YXBweQ==')
  //             .then((characteristic) => {
  //               this.info(characteristic.value);
  //               return 
  //             })
    console.log(connectedDevice.serviceData);
  };
  return {
    allDevices,
    connectToDevice,
    connectedDevice,
    isConnected,
    requestPermissions,
    sendData,
    scanForDevices,
  };
};
