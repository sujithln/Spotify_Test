import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../themes/colors';
import {size} from '../themes/fonts';
export default (props) => {
  const {track} = props.item;
  return (
    <TouchableOpacity
      onPress={() => {
        props.onItemPress(track);
      }}
      style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: track.album.images[0].url}}></Image>
      <View>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.numOfTracks}>artists: {track.artists[0].name}</Text>
        <Text style={styles.numOfTracks}>
          popularity: {track.popularity.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: wp('20%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  img: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  title: {
    color: colors.white,
    fontWeight: '600',
    fontSize: size.l,
  },
  numOfTracks: {
    color: colors.grey,
    fontSize: size.s,
  },
});
