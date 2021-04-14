import {Dimensions, Platform, StatusBar} from 'react-native';

export const DEVICE = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width,
};

export const DIMENSION = {
  HEADER_HEIGHT: DEVICE.HEIGHT * 0.11,
  AVATAR_HEIGHT: 48,
  BUTTON_HEIGHT: 36,
  FORM_HEIGHT: DEVICE.HEIGHT * 0.055,
};

export const STATUS_BAR = Platform.select({
  android: StatusBar.currentHeight,
  ios: 0,
});
