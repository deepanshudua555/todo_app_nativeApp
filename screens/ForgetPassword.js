import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {forgetpasswordPassword, loadUser, verifyOTP, } from '../redux/action';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState("");
  // const {u}
  const dispatch = useDispatch();
    const{loading  } = useSelector(state=>state.message)
  const forgetHandler = async () => {
    await dispatch(forgetpasswordPassword(email.toLowerCase()))
    navigation.navigate("resetpassword");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, margin: 20}}>Reset Your Password</Text>
      <View style={{width: '70%'}}>
        
        <TextInput
            mode="outlined"
            outlineColor="#900"
            activeOutlineColor="#900"
            label="Email"
            keyboardType='email-address'
            style={styles.input}
            placeholder="enter your email"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={email}
            onChangeText={setEmail}
          />
      </View>
      <TouchableOpacity
        style={!email?styles.Ebtn:styles.btn}
        onPress={forgetHandler}
        disabled={!email||loading}>

        <Text style={{color: '#fff'}}>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

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
  Ebtn: {
    backgroundColor: '#900',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
    opacity:0.5
  },
});
