import AppText from 'components/AppText';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface AppHeaderProps {
  title: string;
  isBack?: boolean;
}

const AppHeader = ({title = ''}: AppHeaderProps) => {
  const navigation: any = useNavigation();

  const onPress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewOutside} onPress={onPress}>
        <Icon name="menu" size={32} color={styles.txt.color} />
      </TouchableOpacity>
      <View style={styles.viewMid}>
        <AppText style={styles.txt}>{title}</AppText>
      </View>
      <View style={styles.viewOutside} />
    </View>
  );
};

export default React.memo(AppHeader);
