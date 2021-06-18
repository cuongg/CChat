import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import padding from 'helpers/padding';
import fontSize from 'helpers/fontSize';
import {DEVICE} from 'helpers/dimension';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    padding: padding.p20,
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: fontSize.f20,
    color: color.white,
  },
  header: {
    paddingVertical: padding.p20,
    alignItems: 'center',
    borderColor: color.white,
    borderBottomWidth: 0.5,
    width: '100%',
  },
  avatar: {
    height: DEVICE.WIDTH * 0.2,
    aspectRatio: 1,
    borderRadius: DEVICE.WIDTH * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    height: 40,
    padding: padding.p8,
    minWidth: DEVICE.WIDTH * 0.5,
    textAlign: 'center',
    color: color.white,
    fontSize: fontSize.f18,
  },
});
