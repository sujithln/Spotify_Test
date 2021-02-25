import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../themes/colors';
import {size} from '../themes/fonts';
export default (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onItemPress(props.id, props.numOfTracks);
      }}
      style={styles.container}>
      <Image style={styles.img} source={{uri: props.img}}></Image>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.numOfTracks}>
          number of tracks: {props.numOfTracks.toString()}
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
