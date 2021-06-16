import database from '@react-native-firebase/database';
import AppText from 'components/AppText';
import {HIT_SLOP} from 'helpers/constants';
import {stringToColour} from 'helpers/function';
import I18n from 'locale';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {RootState} from 'redux/reducers';
import styles from './styles';

class DialingScreen extends React.Component {
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
    this.caller = {
      _id: props.userReducer.data.uid,
      name: props.userReducer.data.name,
      phone: props.userReducer.data.phoneNumber,
    };
    this.receiver = props.route.params.user;
    this.isVideo = props.route.params.isVideo;
  }

  componentDidMount() {
    const {navigation}: any = this.props;
    database()
      .ref(`/call/${this.receiver._id}`)
      .once('value', (childSnapShot) => {
        const value = childSnapShot.toJSON();
        if (!value) {
          database().ref(`/call/${this.receiver._id}`).push({
            caller: this.caller,
            receiver: this.receiver,
            isVideo: this.isVideo,
          });
        } else {
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        }
      });

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

  onPressEndCall = () => {
    database().ref(`/call/${this.receiver._id}`).remove();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText style={styles.txtCalling}>{I18n.t('call.calling')}</AppText>
          <AppText style={styles.txtName}>{this.receiver.name}</AppText>
        </View>
        <View style={styles.content}>
          <View
            style={{
              ...styles.avatar,
              backgroundColor: stringToColour(this.receiver._id),
            }}>
            <AppText style={styles.txtChar}>{this.receiver.name[0]}</AppText>
          </View>
        </View>
        <View style={styles.content}>
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

export default connect(mapStateToProps)(DialingScreen);

function mapStateToProps(state: RootState) {
  const {userReducer} = state;
  return {userReducer};
}
