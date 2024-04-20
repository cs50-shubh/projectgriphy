import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const Search = ({handleChange, text, theme}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, {color: theme?.color}]}
        value={text}
        onChangeText={handleChange}
        placeholder="Search here for Gif..."
        placeholderTextColor={theme?.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Search;
