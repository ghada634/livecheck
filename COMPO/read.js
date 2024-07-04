import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';

const ReadMoreScreen = () => {
  const handlePress = async () => {
    const url = 'https://www.aware.com/blog-what-is-liveness-detection/';
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/yes.png')} style={styles.topRightIcon} />
      <Image source={require('../assets/no.png')} style={styles.topLeftIcon} />
      <Text style={styles.title}>What is Liveness Detection?</Text>
      <Text style={styles.paragraph}>
        "Liveness detection" is a technology used to determine whether a biometric sample is being captured from a live subject or from a non-live source such as a photograph or video.
      </Text>
      <Text style={styles.paragraph}>
        That's why it's necessary to capture an image of your face to determine if you are really present or not.
      </Text>
      <Text style={styles.link} onPress={handlePress}>If you don't understand, you can visit this link to learn more.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // fond noir
    padding: 20,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
  },
  title: {
    fontSize: 35, // Augmenter la taille du titre
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // texte blanc
    textAlign: 'center', // Centrer le texte
  },
  paragraph: {
    fontSize: 20, // Augmenter la taille du texte
    marginBottom: 15,
    color: '#ffffff', // texte blanc
    textAlign: 'center', // Centrer le texte
  },
  link: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 70,
  },
  topRightIcon: {
    position: 'absolute',
    top: 50, // Déplacer l'icône vers le bas
    right: 1,
    width: 70, // Augmenter la taille de l'icône
    height: 70,
  },
  topLeftIcon: {
    position: 'absolute',
    top: 50, // Déplacer l'icône vers le bas
    left: 5,
    width: 70, // Augmenter la taille de l'icône
    height: 70,
  },
});

export default ReadMoreScreen;

