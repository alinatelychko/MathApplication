const API_BASE = 'http://192.168.1.7:8085/api';


export const fetchCategories = async () => {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
};

export const fetchTestsByCategory = async (categoryId) => {
    const res = await fetch(`${API_BASE}/tests/category/${categoryId}`);
    if (!res.ok) throw new Error('Failed to fetch tests');
    return res.json();
};

export const fetchQuestionsByTest = async (testId) => {
    const res = await fetch(`${API_BASE}/questions/test/${testId}`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return res.json();
};

export const fetchAnswersByQuestion = async (questionId) => {
    const res = await fetch(`${API_BASE}/answers/question/${questionId}`);
    if (!res.ok) throw new Error('Failed to fetch answers');
    return res.json();
};