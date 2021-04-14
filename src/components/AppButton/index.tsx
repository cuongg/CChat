import AppText from 'components/AppText';
import color from 'helpers/color';
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import styles from './styles';

interface AppButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const AppButton = ({
  text,
  disabled = false,
  onPress,
  style,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnStyle,
        style,
        disabled && {backgroundColor: color.silver},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <AppText style={[styles.text, disabled && {color: color.doveGray}]}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default React.memo(AppButton);
