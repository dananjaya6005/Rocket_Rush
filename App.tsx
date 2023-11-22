import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,ImageBackground } from 'react-native';
import BgImage from './src/Image/BgImage.jpg';


function App() {

  const [time, setTime] = useState(1);
  const [stopTime, setStopTime] = useState(Math.floor(Math.random() * 20) * 30);
  const [bet ,setBet] = useState(100);
  const [placeBetBtnShow , setPlaceBetBtnShow] = useState(true);
  const [TakeProfitBtnShow, setTakeProfitBtnShow] = useState(false);
  const [AccoutBalance, setAccountBalance] = useState(1000);

 const [runningFlow, setRunningFlow] = useState(true);

const [profit, setProfit] = useState(0);
 const [restartFlow, setResartFlow] = useState(false);
 const [isPlacedBet , setIsPlaceBet] = useState(false);
  
const [isUserTakeProfit, setIsUserTakeProfit] = useState(undefined);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 50); // increment every 10ms

    if(time >= stopTime) {
      clearInterval(timer);
      setRunningFlow(false);
      setResartFlow(!restartFlow);
      setTakeProfitBtnShow(false);
    }
    else{
      setRunningFlow(true);
    }

   

    return () => clearInterval(timer);
  }, [time]);


  useEffect(() => {
    setPlaceBetBtnShow(true);
    setIsUserTakeProfit(undefined);
    setProfit(0);
    //wait 3 seconds then start the timer
    setTimeout(() => {
      setTime(1);
      setPlaceBetBtnShow(false);
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

  useEffect(() => {
   handleLoss();
  }, [runningFlow]);


  function handleLoss(){
    if (!runningFlow && isUserTakeProfit === false) {
      setAccountBalance(AccoutBalance - bet);
    }

  }
  


  function handleTakeProfit() {
    if(runningFlow === true){
      setProfit(bet*time/100);
      setAccountBalance(AccoutBalance + bet*time/100);
      setIsUserTakeProfit(true);
    }
  
    setTakeProfitBtnShow(false);
  }


  function placeBet() {
  
    setPlaceBetBtnShow(false);
    setTakeProfitBtnShow(true);
    setIsUserTakeProfit(false);
  }


  return (
    
    <View style={styles.container}>
      <ImageBackground source={BgImage} style={styles.image}>
      <Text style={styles.common_text}>{AccoutBalance}</Text>
      <Text style={[styles.TimerText, {color: color}]}>X {Math.floor(time / 100)}.{time % 100}</Text>
      <Text style={[styles.TimerText, {color: color}]}>Stop Time: {Math.floor(stopTime / 100)}.{stopTime % 100}</Text>
      <Text style={styles.common_text}>{bet*time/100}</Text>
      <Text style={styles.common_text}>{profit}</Text>
      <Button 
      disabled={!TakeProfitBtnShow}
      title="Take Profit" onPress={handleTakeProfit} />

      <Button title="place bet" disabled={!placeBetBtnShow} onPress={placeBet}/>
      </ImageBackground>
    </View>
    
   
  );
}

export default App;

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
  },
  image: {
    flex: 1,
    resizeMode : "cover",
    justifyContent: 'center',
    width: '100%',
  },
  common_text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }
});
