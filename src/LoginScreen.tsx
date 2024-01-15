import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
interface LoginProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAllow, setIsAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://restapi.adequateshop.com/api/authaccount/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const token = await response.json();
      setEmail('');
      setPassword('');
      navigation.navigate('Dashboard');
    } catch (error: any) {
      console.error('Login failed:', error.message);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#0099ff" barStyle="light-content" />
        <Image source={require('../src/Assets/Hidden.png')} style={styles.image} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign in</Text>
        </View>
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

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isAllow}
            onValueChange={() => setIsAllow(!isAllow)}
          />
          <Text style={styles.checkboxText}>Remember me</Text>
          <TouchableOpacity style={{left:70}}>
          <Text style={{ color: '#047CFF',fontWeight:'bold'}}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log in'}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Signup')}>
          Don't have an account?
          <Text style={{ color: '#047CFF',fontWeight:'bold'}}>  Sign Up
            </Text> 
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

    paddingHorizontal: 25,
    backgroundColor: 'white',
    paddingBottom: '50%',
  },
  headingContainer: {
    marginBottom: 20,
    alignSelf: 'center'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#047CFF',
  },
  input: {
    width: '100%',
    marginVertical: 15,
    elevation: 10, backgroundColor: 'white',
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
  loginButton: {
    backgroundColor: '#0099ff',
    padding: 13,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginVertical: 30, alignSelf: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default LoginScreen;
