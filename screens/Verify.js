import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, verifyOTP, } from '../redux/action';

const Verify = () => {
  const [otp, setOtp] = useState();
  // const {u}
  const dispatch = useDispatch();
  const {user,error,message} = useSelector(state => state.auth);
  const verifyHandler = async () => {
    await dispatch(verifyOTP(otp));
    dispatch(loadUser());
  };
  console.log(user.otp);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, margin: 20}}>Verification</Text>
      <View style={{width: '70%'}}>
        
        <TextInput
            mode="outlined"
            outlineColor="#900"
            activeOutlineColor="#900"
            label="OTP"
            keyboardType='number-pad'
            style={styles.input}
            placeholder="enter your OTP"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={otp}
            onChangeText={setOtp}
          />
      </View>
      <Text>use {user.otp} as your otp</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={verifyHandler}>
        <Text style={{color: '#fff'}}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },

  btn: {
    backgroundColor: '#900',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
  },
});
