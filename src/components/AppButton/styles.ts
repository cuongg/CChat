import {StyleSheet} from 'react-native';
import color from 'helpers/color';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
export default StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    backgroundColor: color.primary,
    padding: padding.p8,
    paddingHorizontal: padding.p16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: padding.p24,
    marginVertical: padding.p4,
  },
  text: {
    fontSize: fontSize.f20,
    color: color.white,
  },
  viewIcon: {
    width: '10%',
  },
});
