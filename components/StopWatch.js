import { Audio } from 'expo-av';
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, } from 'react-native';

export function StopWatch() {
  const MAX_TIME = 25;
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playbackInstance, setPlaybackInstance] = useState(null);

  useEffect(
    () => {
      let interval;
      if (isRunning) {
        interval = setInterval(
          () => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
          100
        );
      }
      return () => clearInterval(interval);
    },
    [isRunning]
  );

  const handleReset = async () => {
    setIsRunning(false);
    setElapsedTime(0);
    if (playbackInstance != null) {
      playbackInstance.stopAsync();
    }
  };

  const handleStart = async () => {
    setIsRunning(true);
    loadNewPlaybackInstance();
  };

  const loadNewPlaybackInstance = async () => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      setPlaybackInstance(null);
    }

    const initialStatus = {
      shouldPlay: true,
    }

    const { sound, status } = await Audio.Sound.createAsync(
      require('../assets/cat-purring.mp3'),
      initialStatus,
      null,
      false
    );
    setPlaybackInstance(sound);
  }


  return (
    <React.Fragment>
      <Text style={styles.text}>
        {(MAX_TIME - elapsedTime).toFixed(1)}
      </Text>
      {isRunning 
      ? <Button 
          onPress={handleReset}
          title={`Give Up Your Kitties`}
          color="red"
        />
      : <Button 
          onPress={handleStart}
          title={`Start Meow-Time`}
        />
      }
      
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 35
  }
});