import {StyleSheet} from 'react-native';
import padding from 'helpers/padding';
import fontSize from 'helpers/fontSize';
import {DEVICE} from 'helpers/dimension';
import color from 'helpers/color';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: color.primary,
  },
  content: {
    padding: padding.p16,
    alignItems: 'center',
  },
  txtCalling: {
    color: color.white,
  },
  txtName: {
    fontSize: fontSize.f28,
    color: color.white,
  },
  avatar: {
    height: DEVICE.WIDTH * 0.3,
    aspectRatio: 1,
    borderRadius: DEVICE.WIDTH * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChar: {
    fontSize: fontSize.f48,
    color: color.white,
  },
  btnEndCall: {
    height: DEVICE.WIDTH * 0.15,
    aspectRatio: 1,
    borderRadius: (DEVICE.WIDTH * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.google,
  },
});
