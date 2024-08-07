import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  'home', 'automobile', 'business', 'entertainment', 'politics', 'startup',
   'science', 'sports', 'technology', 'hatke', 'world'
];

export default function Header({ onSelectCategory }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (category) => {
    setModalVisible(false);
    onSelectCategory(category);
  };

  return (
    <View style={tw`p-4 bg-red-600 pt-10 flex-row items-center justify-between shadow-md`}>
      <Text style={tw`text-2xl font-bold text-white`}>DailyBurst</Text>
      <Pressable
        style={tw`bg-gray-900 rounded-full shadow-lg p-3`}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Category Dropdown"
        accessibilityRole="button"
      >
        <Icon name="menu" size={24} color="white" />
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      
       <TouchableOpacity
          style={tw`flex-1 top-20 items-end bg-gray-900 bg-opacity-70`}
          onPress={() => setModalVisible(false)}
        >
          <View style={tw`bg-gray-800 w-64 h-128 p-4 rounded-lg shadow-lg`}>
          <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleCategorySelect(item === 'home' ? '' : item)}
              style={tw`p-2 border-b my-2 border-gray-600 shadow-md rounded bg-gray-700`}
            >
              <Text style={tw`text-white`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </TouchableOpacity>
          )}
       >
          
            </FlatList>
          </View>
        </TouchableOpacity>
       
      </Modal>
    </View>
  );
}
