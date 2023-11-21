import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

function Timer() {
  const min = 1;
  const max = 10;
  const [time, setTime] = useState(1);
  const [stopTime, setStopTime] = useState(Math.floor(Math.random() * 20) * 30);
  const randomInRange = Math.random() * (max - min) + min;
  const [bet ,setBet] = useState(100);
  const [BtnShow, SetBtnShow] = useState(true);
  const [profit, setProfit] = useState(0);
 const [restartFlow, setResartFlow] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 50); // increment every 10ms

    if(time >= stopTime) {
      clearInterval(timer);
      
      setResartFlow(!restartFlow);
      SetBtnShow(false);
    }

   


    return () => clearInterval(timer);
  }, [time]);


  useEffect(() => {
    //wait 3 seconds then start the timer
    setTimeout(() => {
      setTime(1);
      SetBtnShow(true);
      setStopTime(Math.floor(Math.random() * 20) * 30);
    }, 10000); // waits for 4 seconds
    
}, [restartFlow]);


  let color = "green";
  if(time/100 > 1){
     color = "red";
  }
  if(time/100 > 2){
    color = "purple";
  }


  function handleTakeProfit() {
    setProfit(bet*time/100);
    SetBtnShow(false);
  }


  return (
    <View style={styles.container}>
      <Text style={[styles.TimerText, {color: color}]}>X {Math.floor(time / 100)}.{time % 100}</Text>
      <Text style={[styles.TimerText, {color: color}]}>Stop Time: {Math.floor(stopTime / 100)}.{stopTime % 100}</Text>
      <Text>{bet*time/100}</Text>
      <Text>{profit}</Text>
      <Button 
      disabled={!BtnShow}
      title="Take Profit" onPress={handleTakeProfit} />
    </View>
  );
}

export default Timer;

//create styles for this component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TimerText:{
    fontSize: 50,
  }
});
