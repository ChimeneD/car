import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import useBLE from "../hooks/useBLE"
import { colors } from '../utils/colors';

const ControllerScreen = () => {
  const { sendData } = useBLE()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The Controller</Text>
      <View style={styles.btn_container}>
        <IconButton
          icon="arrow-top-left"
          size={30}
          onPress={() => sendData('FL')}
          style={styles.btn}
          mode="contained-tonal"
        />
        <IconButton
          icon="arrow-up-thin"
          size={30}
          onPress={() => sendData('F')}
          style={styles.btn}
          mode="contained-tonal"
        />
        <IconButton
          icon="arrow-top-right"
          size={30}
          onPress={() => sendData('FR')}
          style={styles.btn}
          mode="contained-tonal"
        />
      </View>
      <View style={styles.btn_container}>
        <IconButton
          icon="arrow-left-thin"
          size={30}
          style={styles.btn}
          onPress={() => sendData('L')}
          mode="contained-tonal"
        />
        <IconButton
          icon="square-rounded-outline"
          size={30}
          style={styles.btn}
          onPress={() => sendData('S')}
          mode="contained-tonal"
        />
        <IconButton
          icon="arrow-right-thin"
          size={30}
          style={styles.btn}
          onPress={() => sendData('R')}
          mode="contained-tonal"
        />
      </View>
      <View style={styles.btn_container}>
        <IconButton
          icon="arrow-top-right"
          size={30}
          style={styles.btn}
          onPress={() => sendData('BL')}
          mode="contained-tonal"
        />
        <IconButton
          icon="arrow-down-thin"
          size={30}
          style={styles.btn}
          onPress={() => sendData('B')}
          mode="contained-tonal"
        />
        <IconButton
          icon="arrow-bottom-right"
          size={30}
          style={styles.btn}
          onPress={() => sendData('BR')}
          mode="contained-tonal"
        />
      </View>

      <Button onPress={() => sendData('A')}>Switch to Automatic</Button>
      <Button onPress={() => sendData('M')}>Switch to Manual</Button>
    </View>
  );
};

export default ControllerScreen;
const {tertiary, secondary} = colors
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#E7FF52',
  },
  btn_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  text: {
    // color: '#E7FF52',
    fontSize: 18,
    marginBottom: 10
  },
  btn: {
    backgroundColor: tertiary,
    color: secondary,
  }
});
