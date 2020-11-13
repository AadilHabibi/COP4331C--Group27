import * as React from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const userInfo = { username: 'admin', password: 'pass' }

function HomeScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Flickpick</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({ username: text })} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({ password: text })} />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}
        onPress={() => navigation.navigate('Details')}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

function Signup({ navigation }) {
  return (
    <View style={styles.container}>
    <Text style={styles.signuplogo}>Signup</Text>
    <View style={styles.inputView} >
      <TextInput
        style={styles.inputText}
        placeholder="Enter Email Address"
        placeholderTextColor="#003f5c"
      />
    </View>
    <View style={styles.inputView} >
      <TextInput
        style={styles.inputText}
        placeholder="Username"
        placeholderTextColor="#003f5c"
      />
    </View>
    <View style={styles.inputView} >
      <TextInput
        secureTextEntry
        style={styles.inputText}
        placeholder="Password..."
        placeholderTextColor="#003f5c"
      />
    </View>
    <TouchableOpacity style={styles.loginBtn}
      onPress={() => navigation.navigate('Details')}
    >
      <Text style={styles.loginText} onPress={() => navigation.navigate('Home')}>
        Finish Signup!
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity>
  </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  signuplogo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
    alignItems: 'center',
    //justifyContent: 'center',

  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
