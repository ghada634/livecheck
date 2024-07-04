import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import ReadMoreScreen from './COMPO/read';
import CamScreen from './COMPO/cam'; // Assurez-vous que le chemin est correct

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const handleValidate = () => {
    navigation.navigate('Cam');
    console.log('Navigating to CamScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>LiveCheck!</Text>
      <Image 
        source={require('./assets/pp.gif')} 
        style={styles.image} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.para}>
          Welcome to our application! To begin, tap the 'Next' button below to start the liveness detection process. If you want to learn more, select 'Read More'.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonReadMore]} 
          onPress={() => navigation.navigate('ReadMore')}
        >
          <Icon name="book" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.buttonNext]} 
          onPress={handleValidate}
        >
          <Icon name="arrow-right" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}> Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '🏠 Home' }} 
        />
        <Stack.Screen 
          name="ReadMore" 
          component={ReadMoreScreen} 
          options={{ title:'📖 Read More ' }} 
        />
        <Stack.Screen 
          name="Cam" 
          component={CamScreen} 
          options={{ title: '📷 Camera' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#00008B',
    marginTop: 5,
    marginBottom: 30,
  },
  image: {
    width: 370,
    height: 370,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  para: {
    fontSize: 18.5,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  buttonReadMore: {
    backgroundColor: '#00008B',
  },
  buttonNext: {
    backgroundColor: '#00008B',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  icon: {
    marginRight: 8,
  },
});
