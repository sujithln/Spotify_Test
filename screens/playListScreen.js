import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TRACK_LIST_SCREEN} from '../constants';
import {getPlayList} from '../services/playListService';
import authHandler from '../utils/authenticationHandler';
import {createHttpClient} from '../services/api';
import colors from '../themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PlayListItem from '../components/playListItem';
import * as RNLocalize from 'react-native-localize';

export default class PlayListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshToken: '', accessToken: '', playlist: [], total: 0};
  }
  getPlayList = () => {
    const countryCode = RNLocalize.getCountry();
    getPlayList(this.state.playlist.length, countryCode)
      .then((response) => {
        if (response.status === 200) {
          const updatedPlayList = [...this.state.playlist].concat(
            response.data.playlists.items,
          );
          this.setState({
            ...this.state,
            playlist: updatedPlayList,
            total: response.data.playlists.total,
          });
        }
      })
      .catch((error) => {
        console.log('getPlayList err', error.response);
      });
  };

  onLogin = () => {
    authHandler
      .onLogin()
      .then((result) => {
        this.setState({
          refreshToken: result.refreshToken,
          accessToken: result.accessToken,
        });
        createHttpClient(result.accessToken);
        this.getPlayList();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  refreshToken = () => {
    authHandler
      .refreshLogin(this.state.refreshToken)
      .then((result) => {
        this.setState({
          refreshToken: result.refreshToken,
          accessToken: result.accessToken,
        });
        createHttpClient(result.accessToken);
        this.getPlayList();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  componentDidMount() {
    this.onLogin();
  }
  renderFooter = () => {
    if (this.state.playlist.length !== this.state.total) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={colors.accent}
          />
        </View>
      );
    } else {
      return null;
    }
  };
  onItemPress = (id, total) => {
    this.props.navigation.navigate(TRACK_LIST_SCREEN, {id, total});
  };
  renderPlayListItem = ({item, index}) => {
    return (
      <PlayListItem
        id={item.id}
        onItemPress={this.onItemPress}
        img={item.images[0].url}
        title={item.name}
        numOfTracks={item.tracks.total}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Play List</Text>
        <FlatList
          style={{
            width: wp('90%'),
            height: hp('75%'),
            paddingTop: hp('2%'),
          }}
          data={this.state.playlist}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={this.renderPlayListItem}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
          scrollEventThrottle={400}
          onEndReached={this.getPlayList}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: wp('5%'),
  },
  header: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '600',
  },
  loaderContainer: {
    paddingVertical: hp('2%'),
  },
});
