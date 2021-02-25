import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TRACK_DETAILS_SCREEN} from '../constants';
import {getTrackList} from '../services/playListService';
import authHandler from '../utils/authenticationHandler';
import {createHttpClient} from '../services/api';
import colors from '../themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TrackListItem from '../components/trackListItem';
export default class TrackListScreen extends Component {
  constructor(props) {
    super(props);
    this.playListID = props.route.params?.id;
    this.state = {tracklist: [], total: props.route.params?.total};
  }
  getTrackList = () => {
    getTrackList(this.playListID, this.state.tracklist.length)
      .then((response) => {
        if (response.status === 200) {
          const updatedTrackList = [...this.state.tracklist].concat(
            response.data.items,
          );
          this.setState({
            ...this.state,
            tracklist: updatedTrackList,
          });
        }
      })
      .catch((error) => {
        console.log('getTrackList err', error.response);
      });
  };

  componentDidMount() {
    this.getTrackList();
  }
  renderFooter = () => {
    if (this.state.tracklist.length !== this.state.total) {
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
  onItemPress = (track) => {
    this.props.navigation.navigate(TRACK_DETAILS_SCREEN, {track});
  };
  renderTrackListItem = ({item, index}) => {
    return <TrackListItem onItemPress={this.onItemPress} item={item} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Track List</Text>
        <FlatList
          style={{
            width: wp('90%'),
            height: hp('75%'),
            paddingTop: hp('2%'),
          }}
          data={this.state.tracklist}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={this.renderTrackListItem}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
          scrollEventThrottle={400}
          onEndReached={this.getTrackList}
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
