import database from '@react-native-firebase/database';
import AppText from 'components/AppText';
import color from 'helpers/color';
import {HIT_SLOP} from 'helpers/constants';
import {stringToColour} from 'helpers/function';
import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {RootState} from 'redux/reducers';
import styles from './styles';

interface Props {}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
}

class CallScreen extends Component<Props, State> {
  _engine?: RtcEngine;
  receiver: any;
  caller: any;
  guess: any;
  isVideo: boolean;
  rejectListener: any;

  constructor(props: any) {
    super(props);
    this.caller = props.route.params.caller;
    this.receiver = props.route.params.receiver;
    this.isVideo = props.route.params.isVideo;
    this.guess =
      this.caller._id === props.userReducer.data.uid
        ? this.receiver
        : this.caller;
    this.state = {
      appId: '5865d3f5fa0542d99e72badfb5fd0874',
      token: '',
      channelName: this.receiver._id,
      joinSucceed: false,
      peerIds: [],
      openMicrophone: true,
      enableSpeakerphone: true,
    };
  }

  componentDidMount() {
    const {navigation}: any = this.props;
    this.init();
    this.rejectListener = database()
      .ref(`/call/${this.receiver._id}`)
      .on('child_removed', async (snapShot) => {
        const value = snapShot.toJSON();
        console.log('App -> componentDidMount -> value', value);
        if (value) {
          await this._engine?.leaveChannel();
          navigation.canGoBack() && navigation.goBack();
        }
      });
  }

  componentWillUnmount() {
    database()
      .ref(`/call/${this.receiver._id}`)
      .off('child_removed', this.rejectListener);
    this._engine?.destroy();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    this.isVideo
      ? await this._engine.enableVideo()
      : await this._engine.enableAudio();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });

    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0,
    );
  };

  endCall = () => {
    this.setState({peerIds: [], joinSucceed: false});
    database().ref(`/call/${this.caller._id}`).remove();
    database().ref(`/call/${this.receiver._id}`).remove();
  };

  // Turn the microphone on or off.
  _switchMicrophone = () => {
    const {openMicrophone} = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({openMicrophone: !openMicrophone});
      })
      .catch((err) => {
        console.warn('enableLocalAudio', err);
      });
  };

  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const {enableSpeakerphone} = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({enableSpeakerphone: !enableSpeakerphone});
      })
      .catch((err) => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  render() {
    const {openMicrophone, enableSpeakerphone} = this.state;

    return (
      <View style={styles.container}>
        {this.isVideo ? this._renderVideos() : this._renderGuess()}
        <View style={styles.footer}>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: color.fade}}
            hitSlop={HIT_SLOP}
            onPress={this._switchMicrophone}>
            <Icon
              name={openMicrophone ? 'microphone' : 'microphone-off'}
              size={30}
              color={color.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            hitSlop={HIT_SLOP}
            onPress={this.endCall}>
            <Icon name="phone-hangup-outline" size={30} color={color.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: color.fade}}
            hitSlop={HIT_SLOP}
            onPress={this._switchSpeakerphone}>
            <Icon
              name={enableSpeakerphone ? 'volume-high' : 'volume-medium'}
              size={30}
              color={color.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={{flex: 1}}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              key={value.toString()}
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  _renderGuess = () => {
    return (
      <View style={styles.content}>
        <View
          style={{
            ...styles.avatar,
            backgroundColor: stringToColour(this.guess._id),
          }}>
          <AppText style={styles.txtChar}>{this.guess.name[0]}</AppText>
        </View>
        <AppText style={styles.txtName}>{this.guess.name}</AppText>
      </View>
    );
  };
}

export default connect(mapStateToProps)(CallScreen);

function mapStateToProps(state: RootState) {
  const {userReducer} = state;
  return {userReducer};
}
