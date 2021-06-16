import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import styles from './styles';
import database from '@react-native-firebase/database';

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
}

export default class App extends Component<Props, State> {
  _engine?: RtcEngine;
  receiver: any;
  caller: any;
  rejectListener: any;

  constructor(props: any) {
    super(props);
    this.caller = props.route.params.caller;
    this.receiver = props.route.params.receiver;
    this.state = {
      appId: '5865d3f5fa0542d99e72badfb5fd0874',
      token: '',
      channelName: this.receiver._id,
      joinSucceed: false,
      peerIds: [],
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
    await this._engine.enableVideo();

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

  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>
          {this._renderVideos()}
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
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
}
