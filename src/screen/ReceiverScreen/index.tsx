import database from '@react-native-firebase/database';
import AppText from 'components/AppText';
import {HIT_SLOP} from 'helpers/constants';
import {stringToColour} from 'helpers/function';
import I18n from 'locale';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class ReceiverScreen extends React.Component {
  caller: any;
  receiver: any;
  isVideo: any;
  rejectListener: any;
  acceptListener: any;

  constructor(props: any) {
    super(props);
    this.state = {
      switchScreen: false,
    };
    this.caller = props.route.params.caller;
    this.receiver = props.route.params.receiver;
    this.isVideo = props.route.params.isVideo;
  }

  componentDidMount() {
    const {navigation}: any = this.props;
    this.rejectListener = database()
      .ref(`/call/${this.receiver._id}`)
      .on('child_removed', (snapShot) => {
        const value = snapShot.toJSON();
        if (value && navigation.isFocused()) {
          navigation.canGoBack() && navigation.goBack();
        }
      });
    this.acceptListener = database()
      .ref(`/call/${this.caller._id}`)
      .on('child_added', (snapShot) => {
        const value = snapShot.toJSON();
        if (value && navigation.isFocused()) {
          this.setState({switchScreen: true}, () => {
            navigation.replace('CallScreen', {
              isVideo: this.isVideo,
              caller: this.caller,
              receiver: this.receiver,
            });
          });
        }
      });
  }

  componentWillUnmount() {
    const {switchScreen} = this.state;
    if (!switchScreen) {
      this.onPressEndCall();
    }
    database()
      .ref(`/call/${this.receiver._id}`)
      .off('child_removed', this.rejectListener);
    database()
      .ref(`/call/${this.caller._id}`)
      .off('child_added', this.acceptListener);
  }

  onPressCall = () => {
    database().ref(`/call/${this.caller._id}`).push({
      caller: this.caller,
      receiver: this.receiver,
      isVideo: this.isVideo,
    });
  };

  onPressEndCall = () => {
    database().ref(`/call/${this.receiver._id}`).remove();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText style={styles.txtCalling}>{I18n.t('call.callFrom')}</AppText>
          <AppText style={styles.txtName}>{this.caller.name}</AppText>
        </View>
        <View style={styles.content}>
          <View
            style={{
              ...styles.avatar,
              backgroundColor: stringToColour(this.caller._id),
            }}>
            <AppText style={styles.txtChar}>{this.caller.name[0]}</AppText>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnCall}
            hitSlop={HIT_SLOP}
            onPress={this.onPressCall}>
            <Icon name="phone-outline" size={30} color={styles.txtChar.color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnEndCall}
            hitSlop={HIT_SLOP}
            onPress={this.onPressEndCall}>
            <Icon
              name="phone-hangup-outline"
              size={30}
              color={styles.txtChar.color}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ReceiverScreen;

// function mapStateToProps(state: RootState) {
//   const {userReducer} = state;
//   return {userReducer};
// }
