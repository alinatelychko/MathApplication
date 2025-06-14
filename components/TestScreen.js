import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTestsByCategory } from '../api';

const TestScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestsByCategory(category.id)
            .then(data => {
                setTests(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [category]);

    if (loading) return <ActivityIndicator style={styles.centered} size="large" />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{category.name}</Text>
            <FlatList
                data={tests}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.buttonWrapper}>
                        <Button
                            title={item.title}
                            onPress={() => navigation.navigate('QuestionScreen', { test: item })}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    buttonWrapper: { marginBottom: 15 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default TestScreen;
