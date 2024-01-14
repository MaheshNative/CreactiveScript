import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';

interface SignupProps {
  navigation: any; // You can replace 'any' with the appropriate navigation prop type
}

const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://restapi.adequateshop.com/api/authaccount/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      navigation.navigate('Dashboard');
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      setError(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#0099ff" barStyle="light-content" />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Signup</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Signup'}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text onPress={() => navigation.navigate('LoginScreen')}>
          Already have an account? Login here
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    paddingBottom: '50%',
  },
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginVertical: 15,
    elevation: 10,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  signupButton: {
    backgroundColor: '#0099ff',
    padding: 13,
    borderRadius: 4,
    width: '60%',
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignupScreen;
