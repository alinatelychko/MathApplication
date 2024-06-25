import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text>Your Score: {score} / {total}</Text>
      <Button title="Back to Categories" onPress={() => navigation.popToTop()} />
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

export default ResultScreen;