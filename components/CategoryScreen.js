import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { fetchCategories } from '../api';

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories()
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <ActivityIndicator style={styles.centered} size="large" />;
    if (error) return <Text style={styles.centered}>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.buttonWrapper}>
                        <Button
                            title={item.name}
                            onPress={() => navigation.navigate('TestScreen', { category: item })}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20,   backgroundColor: '#F1EFFF' },
    buttonWrapper: { marginBottom: 15 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default CategoryScreen;
