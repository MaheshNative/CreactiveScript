  import React, { useState } from 'react';
  import { View, Text,Image, TextInput,TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

  interface LoginProps {
    navigation: any; 
  }

  const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
      <View style={styles.container}>
        <StatusBar backgroundColor="#0099ff" barStyle="light-content" />
        <Image source={require('../src/Assets/Hidden.png')} style={styles.image} />
        <View style={styles.headingContainer}>

       
          <Text style={styles.heading}>Login</Text>
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
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text onPress={() => navigation.navigate('Signup')}>
          Don't have an account? Sign up here
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor:'white', paddingBottom:'50%'
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
      elevation:10,backgroundColor:'white',
      padding: 10,
      borderWidth: 0.5,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal:20,
    },
    errorText: {
      color: 'red',
      marginTop: 8,
    },
    loginButton: {
      backgroundColor: '#0099ff',
      padding: 13,
      borderRadius: 4,
      width: '60%',
      alignItems: 'center',
    marginVertical:30
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    image: {
      width:50,
      height: 50, 
      resizeMode: 'cover',
      borderRadius: 10, 
      marginBottom: 20,
    },
  });

  export default LoginScreen;
