import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
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
          style={styles.icon_btn}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="arrow-up-thin"
          size={30}
          onPress={() => sendData('F')}
          style={styles.icon_btn}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="arrow-top-right"
          size={30}
          onPress={() => sendData('FR')}
          style={styles.icon_btn}
          mode="contained"
          color={secondary}
        />
      </View>
      <View style={styles.btn_container}>
        <IconButton
          icon="arrow-left-thin"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('L')}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="square-rounded-outline"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('S')}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="arrow-right-thin"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('R')}
          mode="contained"
          color={secondary}
        />
      </View>
      <View style={styles.btn_container}>
        <IconButton
          icon="arrow-bottom-left"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('BL')}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="arrow-down-thin"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('B')}
          mode="contained"
          color={secondary}
        />
        <IconButton
          icon="arrow-bottom-right"
          size={30}
          style={styles.icon_btn}
          onPress={() => sendData('BR')}
          mode="contained"
          color={secondary}
        />
      </View>

      <Button onPress={() => sendData('A')} color={secondary} mode="contained" style={styles.btn}>Switch to Automatic</Button>
      <Button onPress={() => sendData('M')} style={styles.btn_out} color={secondary} >Switch to Manual</Button>
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
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 20,
    marginTop: 20,
    width: Dimensions.get('window').width - 150,
  },
  text: {
    // color: '#E7FF52',
    fontSize: 25,
    marginBottom: 10,
  },
  icon_btn: {
    backgroundColor: tertiary,
    color: secondary,
  },
  btn: {
    marginBottom: 5,
    width: Dimensions.get('window').width - 130,
  },
  btn_out: {
    backgroundColor: '#252525',
    width: Dimensions.get('window').width - 130,
  },
});
