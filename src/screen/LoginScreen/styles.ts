import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import padding from 'helpers/padding';
import {DEVICE} from 'helpers/dimension';
export default StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: padding.p20,
  },
  container: {
    height: DEVICE.HEIGHT * 0.75,
    backgroundColor: color.white,
    justifyContent: 'center',
    borderRadius: padding.p12,
    padding: padding.p20,
  },
  viewInput: {
    marginBottom: padding.p20,
  },
  textError: {
    color: 'red',
  },
});
