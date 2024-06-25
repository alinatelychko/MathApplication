
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const TestScreen = ({ route, navigation }) => {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text>{category.categoryName}</Text>
      <FlatList
        data={category.tests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.testName}
            onPress={() => navigation.navigate('QuestionScreen', { test: item })}
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

export default TestScreen;