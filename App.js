import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [habit, setHabit] = useState('');
  const [habits, setHabits] = useState([
  {id: '1', name: 'Drink 2L Water', completed: true },
    { id: '2', name: 'Read 15 mins', completed: false },
    { id: '3', name: 'Code for 30 mins', completed: false },
  ]);

  const addHabit = () => {
    if (!habit.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), name: habit, completed: false }]);
    setHabit('');
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(item => item.id !== id));
  };

  const completedCount = habits.filter(item => item.completed).length;
  const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Momentum ⚡</Text>
        <Text style={styles.subtitle}>Build better habits, one day at a time.</Text>
      </View>

      {/* Progress Bar Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressTitle}>Daily Progress</Text>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressSubtext}>{completedCount} of {habits.length} habits completed</Text>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new habit..."
          placeholderTextColor="#888"
          value={habit}
          onChangeText={setHabit}
        />
        <TouchableOpacity style={styles.addButton} onPress={addHabit}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Habit List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <TouchableOpacity style={styles.habitInfo} onPress={() => toggleHabit(item.id)}>
              <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={[styles.habitText, item.completed && styles.habitTextCompleted]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteHabit(item.id)}>
              <Ionicons name="trash-outline" size={20.0} color="#ff5252" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  progressCard: { backgroundColor: '#1e1e1e', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#2a2a2a' },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  progressPercent: { color: '#4cd137', fontSize: 16, fontWeight: 'bold' },
  progressBarBackground: { height: 8, backgroundColor: '#2a2a2a', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: '#4cd137', borderRadius: 4 },
  progressSubtext: { color: '#888', fontSize: 12 },
  inputContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  input: { flex: 1, backgroundColor: '#1e1e1e', color: '#fff', paddingHorizontal: 16, borderRadius: 12, height: 50, borderWidth: 1, borderColor: '#2a2a2a', fontSize: 16 },
  addButton: { backgroundColor: '#4cd137', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 12 },
  habitCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1e1e1e', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#2a2a2a' },
  habitInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#555', marginRight: 14, justifyContent: 'center', alignItems: 'center' },
  checkboxCompleted: { backgroundColor: '#4cd137', borderColor: '#4cd137' },
  habitText: { color: '#fff', fontSize: 16 },
  habitTextCompleted: { color: '#777', textDecorationLine: 'line-through' }
});