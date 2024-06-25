
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import testCategories from '../data';

const CategoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={testCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.categoryName}
            onPress={() => navigation.navigate('TestScreen', { category: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryScreen;