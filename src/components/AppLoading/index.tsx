import React from 'react';
import {ActivityIndicator} from 'react-native';
import color from 'helpers/color';

interface AppLoadingProps {
  size?: 'small' | 'large';
}

const AppLoading = ({size = 'small'}: AppLoadingProps) => {
  return <ActivityIndicator size={size} color={color.primary} />;
};

export default React.memo(AppLoading);
