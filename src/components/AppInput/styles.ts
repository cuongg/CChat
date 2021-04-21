import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import padding from 'helpers/padding';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    padding: padding.p12,
    backgroundColor: color.white,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: color.primary,
  },
  image: {
    height: 40,
    width: 40,
  },
  txtInput: {
    height: 40,
    padding: padding.p8,
    width: '80%',
  },
});
