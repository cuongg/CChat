import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import styles from './styles';

interface AppTextProps extends TextProps {
  children?: any;
  style?: TextStyle | any;
}
const AppText = (props: AppTextProps) => {
  return (
    <Text {...props} style={[styles.defaultText, props.style]}>
      {props.children}
    </Text>
  );
};
export default React.memo(AppText);
