import color from 'helpers/color';
import {DEVICE} from 'helpers/dimension';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {Dimensions, StyleSheet} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    padding: padding.p16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    height: DEVICE.WIDTH * 0.15,
    aspectRatio: 1,
    borderRadius: (DEVICE.WIDTH * 0.15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.google,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    flex: 1,
  },
  remoteContainer: {
    width: '100%',
    // height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 200,
    marginHorizontal: 2.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  txtName: {
    fontSize: fontSize.f24,
    margin: padding.p8,
  },
});
