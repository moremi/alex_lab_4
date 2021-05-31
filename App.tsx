import React, {createContext, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Vk from './Vk';
import VkSubs from './VkSubs';
import Med from './Med';
import Geolocation from 'react-native-geolocation-service';
import Geolocation2 from '@react-native-community/geolocation';

const Stack = createStackNavigator();

const App = () => {
  const [fir, setFir] = useState(true);
  const firr = useRef(true);
  useEffect(() => {
    // setTimeout(() => {
    //   Geolocation2.getCurrentPosition(info => console.log(info), undefined, {
    //     timeout: 1000,
    //     enableHighAccuracy: false,
    //     maximumAge: 1000,
    //   });
    // }, 1000);

    // Geolocation.requestAuthorization('always').then(res => {
    //   console.log(res);
    // });
    const r = Geolocation.watchPosition(
      pos => {
        console.log(pos);
        if (firr.current) {
          firr.current = false;
          return;
        }
        Alert.alert('Наденьте маску!');
      },
      err => {
        console.log(err);
      },
      {
        distanceFilter: 200,
        interval: 5000,
        showLocationDialog: true,
        accuracy: {
          android: 'high',
          ios: 'best',
        },
      },
    );
    // console.log({r});
    // console.log('ss');
    // Geolocation.getCurrentPosition(
    //   pos => {
    //     console.log(pos);
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   {distanceFilter: 10},
    // );
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'main'}
          options={{title: 'Med guide'}}
          component={Med}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
