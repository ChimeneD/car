import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import useBLE from '../hooks/useBLE';
// import {Button} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {colors} from '../utils/colors';

const HomeScreen = () => {
  const {sendData} = useBLE();
  const [location, setLocation] = useState(null);
  const [wayPoint, setWayPoint] = useState(null);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(data => {
        const locData = {
          latitude: data.latitude,
          longitude: data.longitude,
        };
        setLocation(locData);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const chooseWayPoint = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(data => {
        const locData = {
          latitude: data.latitude,
          longitude: data.longitude,
        };
        setWayPoint(locData);
        // sendData(`${data.longitude.toFixed(6)},${data.latitude.toFixed(6)}`);
        sendData(`SW`);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  const drive = () => {
    sendData('D');
  };
  const clearWayPoint = () => {
    setWayPoint(null);
    sendData(`CW`);
  };
  return (
    <View style={styles.container}>
      {location !== null && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0005,
          }}>
          <Marker
            title="Me"
            pinColor="gold"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
          <Marker
            title="Choose Destination"
            pinColor="teal"
            coordinate={
              wayPoint !== null
                ? wayPoint
                : {
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }
            }
            draggable={true}
          />
        </MapView>
      )}
      <View style={styles.text_container}>
        <Text>
          Waypoint: longitude: {wayPoint ? wayPoint.longitude : 'null'} ,
          latitude:{` `}
          {wayPoint ? wayPoint.latitude : 'null'}
        </Text>
        <TouchableOpacity>
          <Button onPress={chooseWayPoint} mode="contained" style={styles.btn}>
            Set Waypoint
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button onPress={clearWayPoint} mode="contained" style={styles.btn}>
            Clear Waypoint
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button disabled={wayPoint === null ? true : false} onPress={drive}>
            Drive
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {background, tertiary, secondary} = colors;
const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    padding: 5,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  btn: {
    width: Dimensions.get('window').width - 30,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: tertiary,
    textColor: secondary
  }
});
export default HomeScreen;
