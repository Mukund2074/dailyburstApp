import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Image, Linking, ActivityIndicator } from 'react-native';
import { fetchNews } from '../Api/ApiManagement';
import tw from 'twrnc';
import Header from '../Components/Header';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        if (category) {
          const response1 = await fetchNews({ category });
          setData(response1.data || []);
        } else {
          const response2 = await axios.get('https://inshorts.vercel.app/news/top');
          setData(response2.data.data.articles || []);
        }
      } catch (error) {
        setData([]);
        alert('Error fetching news.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category]);

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleOpenUrl = (url) => {
    Linking.openURL(url).catch(() => alert('Failed to open URL.'));
  };

  if (loading) {
    return (
      <View style={tw`flex-1 w-full bg-black`}>
        <Header onSelectCategory={handleCategorySelect} />
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="#e62429" />
          <Text style={tw`text-xl font-bold text-white mt-4`}>Loading...</Text>
        </View>
      </View>
    );
  }


  const keyExtractor = (item, index) => {
    const key = category ? item.id : item.hashId;
    return key ? key.toString() : index.toString();
  };
  

  return (
    <View style={tw`flex-1 bg-black`}>
      <Header onSelectCategory={handleCategorySelect} />
      <View style={tw`flex-1 items-center`}>
        <Text style={tw`text-2xl font-bold text-red-600 my-4`}>
          {category === '' ? 'Top News' : `${category.charAt(0).toUpperCase() + category.slice(1)} News`}
        </Text>
        <FlatList
          data={data}
          style={tw`w-full`}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <View style={tw`bg-gray-800 border border-gray-600 shadow-lg rounded-lg my-2 mx-4 p-4`}>
               <Text style={tw`text-lg font-bold text-white mt-2`}>
                {item.title}
              </Text>
            <Text style={tw`text-sm text-gray-400 my-2`}>By {item.author || item.authorName}   </Text> 
            
              <Image source={{ uri: item.imageUrl }} style={tw`w-full h-60 rounded-lg border border-red-600`} />
             
             <View style={tw` items-end `}>
              <Text style={tw`text-sm text-gray-400 mt-1`}>{` ${item.date || ''} ${item.time || ''}`}</Text> 
              </View>
              <Text numberOfLines={3} style={tw`text-gray-300 mt-2`}>
                {item.content}
              </Text>
              <Pressable
                onPress={() => handleOpenUrl(item.readMoreUrl || item.sourceUrl)}
                style={tw`flex items-center justify-center mt-4 bg-red-600 rounded-lg`}
              >
                <Text style={tw`text-center text-white py-2 px-4`}>
                  <Icon name="link" size={16} color="white" /> Read More
                </Text>
              </Pressable>
            </View>
          )}
        />
        <Pressable
          onPress={() => setCategory('')}
          style={tw`bg-red-600 w-1/3 py-2 rounded-lg mt-4`}
        >
          <Text style={tw`text-white text-center`}>Reload App</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
