import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProgressIndicator = ({ currentQuestionIndex, totalQuestions, onPress }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalQuestions }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.indicator,
            index === currentQuestionIndex ? styles.currentIndicator : styles.completedIndicator,
          ]}
          onPress={() => onPress(index)}
        >
          <Text style={styles.indicatorText}>{index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  indicator: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
  currentIndicator: {
    backgroundColor: 'lightblue',
  },
  completedIndicator: {
    backgroundColor: 'lightgreen',
  },
  indicatorText: {
    color: 'white',
  },
});

export default ProgressIndicator;
