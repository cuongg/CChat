import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import {DIMENSION} from 'helpers/dimension';
import fontSize from 'helpers/fontSize';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.primary,
    height: DIMENSION.HEADER_HEIGHT,
  },
  viewOutside: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: fontSize.f20,
    color: color.white,
  },
});
