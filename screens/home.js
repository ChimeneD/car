import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {colors} from '../utils/colors';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
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
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable={true}
          />
        </MapView>
      )}
    </View>
  );
};

const {background} = colors;
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
});
export default HomeScreen;
