import color from 'helpers/color';
import {StyleSheet} from 'react-native';
import {DIMENSION} from 'helpers/dimension';

export default StyleSheet.create({
  txt: {
    color: color.white,
  },
  avatar: {
    height: DIMENSION.AVATAR_HEIGHT,
    width: DIMENSION.AVATAR_HEIGHT,
    borderRadius: DIMENSION.AVATAR_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
