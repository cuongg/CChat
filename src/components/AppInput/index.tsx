import React from 'react';
import {View, TextInput, TextInputProps} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';

interface AppInputProps extends TextInputProps {
  icon: any;
}

const AppInput = ({icon, ...props}: AppInputProps) => {
  return (
    <View style={styles.wrapper}>
      <FastImage
        source={icon}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextInput style={styles.txtInput} {...props} />
    </View>
  );
};

export default React.memo(AppInput);
