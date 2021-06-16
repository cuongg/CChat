import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import color from 'helpers/color';
import padding from 'helpers/padding';
import AppText from 'components/AppText';
import _ from 'lodash';
import {HIT_SLOP} from 'helpers/constants';
import I18n from 'locale';
import {useNavigation} from '@react-navigation/native';

interface ModalInformationProps {
  data: any;
  onClose: () => void;
}

const ModalInformation = ({
  data = {},
  onClose = () => {},
}: ModalInformationProps) => {
  const navigation = useNavigation();
  const {user} = data;

  const onPressCallSIM = () => {
    Linking.openURL(`tel:${user?.phone}`);
  };

  const onPressAudioCall = () => {
    navigation.navigate('DialingScreen', {user, isVideo: false});
    onClose();
  };

  const onPressVideoCall = () => {
    navigation.navigate('DialingScreen', {user, isVideo: true});
    onClose();
  };

  return (
    <Modal transparent visible={!_.isEmpty(data)} onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}>
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          <TouchableOpacity
            style={styles.btn}
            hitSlop={HIT_SLOP}
            onPress={onPressCallSIM}>
            <AppText>
              {I18n.t('chat.callSIM')} ({user?.phone})
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            hitSlop={HIT_SLOP}
            onPress={onPressAudioCall}>
            <AppText>{I18n.t('chat.audioCall')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            hitSlop={HIT_SLOP}
            onPress={onPressVideoCall}>
            <AppText>{I18n.t('chat.videoCall')}</AppText>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.fade,
    justifyContent: 'center',
    padding: padding.p16,
  },
  content: {
    padding: padding.p20,
    backgroundColor: color.white,
    borderRadius: 10,
  },
  btn: {
    paddingVertical: padding.p8,
  },
});
