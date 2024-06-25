import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressIndicator from './ProgressIndicator';

const QuestionScreen = ({ route, navigation }) => {
  const { test } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = test.questions[currentQuestionIndex];

  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAdditionalInfo(false);
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('ResultScreen', { score, total: test.questions.length });
    }
  };

  const handleIndicatorPress = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null);
    setShowAdditionalInfo(false);
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={test.questions.length}
        onPress={handleIndicatorPress}
      />
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      </View>
      {currentQuestion.options ? (
        currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option ? styles.selectedOption : null,
            ]}
            onPress={() => handleAnswerSelection(option)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <TextInput
          style={styles.textInput}
          value={selectedAnswer}
          onChangeText={setSelectedAnswer}
          editable={selectedAnswer === null}
        />
      )}
      {selectedAnswer !== null && (
        <>
          <Text style={styles.resultText}>
            {selectedAnswer === currentQuestion.correctAnswer ? 'правильне рішення!' : 'Wrong!'} The correct answer is: {currentQuestion.correctAnswer}
          </Text>
          <Button
            title="показати додаткову інформацію"
            onPress={() => setShowAdditionalInfo(true)}
            disabled={showAdditionalInfo}
          />
          {showAdditionalInfo && <Text style={styles.additionalInfoText}>{currentQuestion.additionalInfo}</Text>}
          <Button title="Закрити" onPress={handleNextQuestion} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  questionContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfoText: {
    marginTop: 20,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
});

export default QuestionScreen;
