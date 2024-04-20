import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {apiKey} from '../../constants';
import {useDebounce} from '../util/debounce';
import Search from './Search';

const ITEM_HEIGHT = 200;

const List = props => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [loading, setloading] = useState(true);
  const [offset, setoffset] = useState(0);

  const getData = async () => {
    setloading(true);
    try {
      let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${
        text.length ? text : ''
      }&limit=10&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`;
      const res = await axios.get(url);
      if (res?.data?.data?.length) {
        data?.length
          ? setData([...data, ...res?.data?.data])
          : setData(res?.data?.data);
        if (res?.data?.data?.length === 10) {
          setoffset(prev => prev + 10);
        }
      } else {
        setData([]);
      }
      console.log(url);
      setloading(false);
    } catch (e) {
      setloading(false);
    }
  };
  console.log(loading);
  const handleSearch = str => {
    setText(str);
  };

  const debouncedSearch = useDebounce(getData, 500);

  useEffect(() => {
    if (text.length) {
      debouncedSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    getData();
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.item}>
        <Image
          source={{uri: item?.images?.original?.url}}
          style={styles?.image}
        />
      </View>
    );
  };
  return (
    <View style={styles?.container}>
      <Search text={text} handleChange={handleSearch} theme={props?.theme} />

      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(i, index) => index}
        showsVerticalScrollIndicator={false}
        getItemLayout={(i, index) => {
          return {
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index: index,
          };
        }}
        onEndReached={getData}
        onEndReachedThreshold={0.1}
        refreshing={loading}
      />
      {loading && <ActivityIndicator size={40} />}
    </View>
  );
};

List.propTypes = {};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: '100%',
    paddingBottom: 50,
  },
  item: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    elevation: 7,
  },
  image: {
    width: '100%',
    height: 200,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
});

export default List;
