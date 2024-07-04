import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as FaceDetector from 'expo-face-detector';

export default function CamScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [directionStep, setDirectionStep] = useState('faceDetected');
  const [message, setMessage] = useState('Please look straight ahead.');
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFaceDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0];
      let yawAngle = face.yawAngle;
      const smilingProbability = face.smilingProbability;
      const eyeOpenProbability = face.rightEyeOpenProbability;

      // Convertir les angles proches de 360° en angles négatifs
      if (yawAngle > 180) {
        yawAngle = yawAngle - 360;
      }

      console.log(`Yaw Angle: ${yawAngle}, Direction Step: ${directionStep}, Smiling Probability: ${smilingProbability}`);

      switch (directionStep) {
        case 'faceDetected':
          setMessage('Face detected, now turn your head to the right.');
          setDirectionStep('right');
          break;
        
        case 'right':
          if (yawAngle > 10) {
            setMessage('Head turned right, now please smile 😊');
            setDirectionStep('smile');
          } else if (yawAngle < -10) {
            setMessage('Please turn your head to the right.');
          }
          break;
        
        case 'smile':
          if (smilingProbability > 0.5) {
            if (!eyesClosed) {
              setMessage('Smile detected, now please close your eyes.');
              setEyesClosed(true);
            }
            setDirectionStep('closeEyes');
          }
          break;
        
        case 'closeEyes':
          if (eyeOpenProbability < 0.2) {
            setMessage(' human detected ✓');
            setDirectionStep('done');
          }
          break;
        
        default:
          break;
      }
    } else {
      console.log('No face detected');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.noAccessText}>No access to camera 📵</Text>;
  }

  const { width } = Dimensions.get('window');
  const cameraSize = width * 0.8;

  return (
    <View style={styles.container}>
      <View style={[styles.cameraContainer, { width: cameraSize, height: cameraSize, borderRadius: cameraSize / 2 }]}>
        <Camera
          style={styles.cameraView}
          ref={cameraRef}
          type={type}
          onFacesDetected={handleFaceDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.instructions}>
        Follow these steps
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleCameraType}
      >
        <Text style={styles.text}>Toggle Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#00008B',
    position: 'absolute',
    top: 120, // Adjust this value to move the circle higher or lower
  },
  cameraView: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#00008B',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 70,
    left: '25%',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  noAccessText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 200,
    paddingHorizontal: 20,
    fontWeight:'bold',
  },
});