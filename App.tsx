import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground ,Image } from "react-native";
import BgImage from "./src/Image/BgImage.jpg";
import { Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import rocketMan from './src/Image/rokectMan.png';
import rockeetMan2 from './src/Image/rocketMan2.png';
import { TextInput } from 'react-native-paper';
import {Keyboard, TouchableWithoutFeedback,KeyboardAvoidingView} from 'react-native'






function App() {
  
  const [time, setTime] = useState(1);
  const [stopTime, setStopTime] = useState(Math.floor(Math.random() * 20) * 30);
  const [bet, setBet] = useState(100);
  const [placeBetBtnShow, setPlaceBetBtnShow] = useState(true);
  const [TakeProfitBtnShow, setTakeProfitBtnShow] = useState(false);
  const [AccoutBalance, setAccountBalance] = useState(1000);

  const [runningFlow, setRunningFlow] = useState(true);

  const [profit, setProfit] = useState(0);
  const [restartFlow, setResartFlow] = useState(false);
  const [isPlacedBet, setIsPlaceBet] = useState(false);

  const [isUserTakeProfit, setIsUserTakeProfit] = useState(undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 50); // increment every 10ms

    if (time >= stopTime) {
      clearInterval(timer);
      setRunningFlow(false);
      setResartFlow(!restartFlow);
      setTakeProfitBtnShow(false);
    } else {
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

  let color = "#66ff33";
  if (time / 100 > 1) {
    color = "#ffcc00";
  }
  if (time / 100 > 2) {
    color = "#ff0066";
  }

  useEffect(() => {
    handleLoss();
  }, [runningFlow]);

  function handleLoss() {
    if (!runningFlow && isUserTakeProfit === false) {
      setAccountBalance(AccoutBalance - bet);
    }
  }

  function handleTakeProfit() {
    if (runningFlow === true) {
      setProfit((bet * time) / 100);
      setAccountBalance(AccoutBalance + (bet * time) / 100);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground source={BgImage} style={styles.image}>
      
        <View style={{ marginTop: 40 }}>
          <Text style={styles.common_text}>
            Account Blance : {AccoutBalance} $
          </Text>
        </View>

        <View style={{ marginTop: 30 ,flexDirection:'row',justifyContent:'space-between'}}>
          <Image source={rocketMan} style={{width:150,height:150}}/>
          <Image source={rockeetMan2} style={{width:180,height:180}}/>
        </View>

        <View style={styles.topConatiner}>
          <View style={styles.WholeCardConatiner}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={[styles.TimerText, { color: color }]}>
                X {Math.floor(time / 100)}.{time % 100}
              </Text>
            </View>
          </View>
        </View>


        <View style={{alignItems:'center'}}>
        <View style={{width:"70%", alignItems:'center',backgroundColor:'rgba(255,255,255,0.8)',borderRadius:10}}>
        <TextInput
        disabled={runningFlow}
        label="Enter your Bet"
        placeholder="100"
        keyboardAppearance="dark"
        keyboardType="numeric"
        style={{width:'100%', color:"white",borderRadius:10}}
        onChangeText={(value)=>{setBet(value)}}/>
        </View>
        </View>
    

        {!runningFlow &&(
          <Text style={styles.waitFornextRoundText}>Place Your Bet !</Text>
        )
        }

       

        {/* <Text style={{color:"white"}}>
          Stop Time: {Math.floor(stopTime / 100)}.{stopTime % 100}
        </Text> */}

        <View style={{flexDirection:"row-reverse",justifyContent:'space-between' ,padding:20}}>
        <Text style={styles.common_text}>{(bet * time) / 100}</Text>
        <Text style={styles.common_text}> Proift : {profit} $</Text>

        </View>
       

        <View style={styles.buttomConatner}>
          <View style={styles.btnConatinerCard}>
            <View style={styles.btnConatiner}>
              <Button
                buttonColor="#b30000"
                style={{ marginTop: 10, padding: 3 }}
                labelStyle={{ fontSize: 18 }}
                mode="contained"
                disabled={!TakeProfitBtnShow}
                onPress={handleTakeProfit}
              >
                Take Profit
              </Button>

              <Button
              buttonColor="#e65c00"
                style={{ marginTop: 10, padding: 3 }}
                labelStyle={{ fontSize: 18 }}
                mode="contained"
                disabled={!placeBetBtnShow}
                onPress={placeBet}
              >
                Place Bet
              </Button>
            </View>
          </View>
        </View>
        
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}

export default App;

//create styles for this component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  TimerText: {
    fontSize: 50,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius:8,
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    width: "100%",
  },
  common_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  commonBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  btnConatiner: {
    width: "70%",
    justifyContent: "center",
    margin: "auto",
  },
  btnConatinerCard: {
    width: "80%",

    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
  },
  buttomConatner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  WholeCardConatiner: {
    width: "80%",
    
    borderRadius: 20,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
  },
  BgBlurContianer: {
    width: "50%",
    height: "50%",
    backgroundColor: "pink",
  },
  blurContainer: {
    width: "100%",
    height: "100%",
  },
  topConatiner: {
    flex:1,
    width: "100%",
    alignItems: "center",
    
  },

  waitFornextRoundText:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius:8,
  }
});
