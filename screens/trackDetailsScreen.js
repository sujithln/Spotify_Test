import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import colors from '../themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {size} from '../themes/fonts';
export default class TrackDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.track = props.route.params?.track;
  }
  getArtistName = () => {
    let artistName = '';
    this.track.artists.forEach((artist, index) => {
      if (this.track.artists.length - 1 === index) {
        artistName = `${artistName} ${artist.name}`;
      } else {
        artistName = `${artistName} ${artist.name},`;
      }
    });
    return artistName;
  };
  millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Track Details</Text>
        <Image
          style={styles.img}
          source={{uri: this.track.album.images[0].url}}></Image>
        <Text style={styles.title}>{this.track.name}</Text>
        <Text style={styles.artist}>{this.getArtistName()}</Text>
        <Text style={styles.artist}>
          Duration: {this.millisToMinutesAndSeconds(this.track.duration_ms)}
        </Text>
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
    marginBottom: hp('5%'),
  },
  title: {
    color: colors.white,
    fontSize: size.xxxxl,
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  artist: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: size.l,
    marginBottom: hp('1%'),
  },
  img: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
});
