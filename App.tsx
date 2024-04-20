/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import List from './src/list/List';

function App(): React.JSX.Element {
  const [mode, setMode] = useState(useColorScheme());
  const [isEnabled, setisEnabled] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    backgroundColor: mode === 'dark' ? 'black' : 'white',
    color: mode === 'dark' ? 'white' : 'black',
  };

  const toggleSwitch = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    setisEnabled(prev => !prev);
  };

  return (
    <SafeAreaView style={theme}>
      <View style={styles.container}>
        <Text style={[styles.theme, {color: theme?.color}]}>Color Theme</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? 'aliceblue' : 'black'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.toggle}
        />
      </View>
      <List theme={theme} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  toggle: {
    alignSelf: 'flex-end',
  },
  theme: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default App;
