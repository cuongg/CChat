import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import padding from 'helpers/padding';
import fontSize from 'helpers/fontSize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    padding: padding.p20,
  },
  txt: {
    fontSize: fontSize.f20,
    color: color.white,
  },
});
