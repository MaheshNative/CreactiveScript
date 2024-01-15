import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface SignupProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isAllow, setIsAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!isChecked) {
      setError('Please agree to the terms and conditions');
      return;
    }
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
        <Image source={require('../src/Assets/Hidden.png')} style={styles.image} />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create an account</Text>
          <Text style={{ color: '#B3B3B3', textAlign:'center' }}>You don’t have an account, let’s create one</Text>
        </View>
        <TextInput style={styles.input} placeholder="Name" onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
        <View style={{paddingVertical:10}}>

        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxText}>I agree to the terms & conditions</Text>
        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
            value={isAllow}
            onValueChange={() => setIsAllow(!isAllow)}
          />
          <Text style={styles.checkboxText}>Allow Notifications</Text>
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Text style={{textAlign:'center'}} onPress={() => navigation.navigate('LoginScreen')}>
          Already have an account? 
          <Text style={{ color: '#047CFF',fontWeight:'bold'}}> Login
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#047CFF',
    textAlign: 'center',
    paddingBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
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
    textAlign: 'center',
    marginBottom:10
  },
  signupButton: {
    backgroundColor: '#0099ff',
    padding: 13,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    alignSelf:'center', marginTop:'15%'
  },
});

export default SignupScreen;
