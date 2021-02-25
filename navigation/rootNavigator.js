import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlayListScreen from '../screens/playListScreen';
import TrackListScreen from '../screens/trackListScreen';
import TrackDetailsScreen from '../screens/trackDetailsScreen';
import {
  PLAYLIST_SCREEN,
  TRACK_LIST_SCREEN,
  TRACK_DETAILS_SCREEN,
} from '../constants';
const Stack = createStackNavigator();
import {NavigationContainer} from '@react-navigation/native';

export default AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={PLAYLIST_SCREEN}
        screenOptions={{
          headerShown: false,
          // gestureEnabled: false,
        }}>
        <Stack.Screen name={PLAYLIST_SCREEN} component={PlayListScreen} />
        <Stack.Screen name={TRACK_LIST_SCREEN} component={TrackListScreen} />
        <Stack.Screen
          name={TRACK_DETAILS_SCREEN}
          component={TrackDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
