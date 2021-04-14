import {PixelRatio, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const scale = width / 375;

const responsivePadding = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default {
  p2: responsivePadding(2),
  p4: responsivePadding(4),
  p6: responsivePadding(6),
  p8: responsivePadding(8),
  p12: responsivePadding(12),
  p16: responsivePadding(16),
  p20: responsivePadding(20),
  p24: responsivePadding(24),
  p28: responsivePadding(28),
  p32: responsivePadding(32),
  p36: responsivePadding(36),
  p40: responsivePadding(40),
  p44: responsivePadding(44),
  p48: responsivePadding(48),
  p52: responsivePadding(52),
};
