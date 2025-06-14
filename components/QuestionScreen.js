import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { fetchQuestionsByTest, fetchAnswersByQuestion } from '../api';
import ProgressIndicator from './ProgressIndicator';

const QuestionScreen = ({ route, navigation }) => {
  const { test } = route.params;
  const [questions, setQuestions] = useState([]);
  const [answersMap, setAnswersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestionsByTest(test.id)
        .then(async (questionsData) => {
          setQuestions(questionsData);

          const map = {};
          for (const q of questionsData) {
            try {
              const answers = await fetchAnswersByQuestion(q.id);
              map[q.id] = answers;
            } catch {
              map[q.id] = [];
            }
          }
          setAnswersMap(map);
          setLoading(false);
        })
        .catch(e => {
          setError(e.message);
          setLoading(false);
        });
  }, [test]);

  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;
  if (error) return <Text style={styles.centered}>Error: {error}</Text>;

  if (questions.length === 0) return <Text style={styles.centered}>No questions found.</Text>;

  const currentQuestion = questions[currentQuestionIndex];
  const answers = answersMap[currentQuestion.id] || [];

  const onAnswerSelect = (answer) => {
    setSelectedAnswerId(answer.id);
    if (answer.correct) {
      setScore(prev => prev + 1);
    }
  };

  const onNext = () => {
    setSelectedAnswerId(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Перехід на екран результатів
      navigation.navigate('ResultScreen', { score, total: questions.length });
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>{test.title}</Text>

        <ProgressIndicator
            totalQuestions={questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onPress={(index) => {
              setCurrentQuestionIndex(index);
              setSelectedAnswerId(null);
            }}
        />

        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        {answers.map((ans) => (
            <TouchableOpacity
                key={ans.id}
                style={[
                  styles.answerButton,
                  selectedAnswerId === ans.id && (ans.correct ? styles.correctAnswer : styles.wrongAnswer),
                ]}
                disabled={selectedAnswerId !== null}
                onPress={() => onAnswerSelect(ans)}
            >
              <Text style={styles.answerText}>{ans.text}</Text>
            </TouchableOpacity>
        ))}

        {selectedAnswerId && (
            <View style={{ marginTop: 20 }}>
              <Button title={currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"} onPress={onNext} />
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  questionText: { fontSize: 18, marginVertical: 15 },
  answerButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  answerText: { fontSize: 16 },
  correctAnswer: { backgroundColor: 'green' },
  wrongAnswer: { backgroundColor: 'red' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default QuestionScreen;
