import {View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgetpasswordPassword,
  loadUser,
  resetPassword,
  verifyOTP,
} from '../redux/action';

const ResetPassword = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setnewPassword] = useState('');
  // const {u}
  const dispatch = useDispatch();
  
  const {loading,message,error} = useSelector(state => state.message);
  const changePasswordHandler = async () => {
    await dispatch(resetPassword(otp, newPassword));
      navigation.navigate('login');
  };
  

  useEffect(() => {
    if (message) {
      Alert.alert('MESSAGE', message, [{text: 'ok'}], {
        cancelable: false,
      });
      dispatch({type: 'clearMessage'});
    }
    if (error) {

        Alert.alert('ERROR', error, [{text: 'ok'}], {
          cancelable: false,
        });
        navigation.goBack();
        dispatch({type: 'clearError'});
      }
  }, [Alert, message,dispatch,error]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, margin: 20}}>Change Password</Text>
      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          label="OTP"
          keyboardType="number-pad"
          style={styles.input}
          placeholder="enter your OTP"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={otp}
          onChangeText={setOtp}
        />
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          secureTextEntry
          label="New Password"
          style={styles.input}
          placeholder="enter your new password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={newPassword}
          onChangeText={setnewPassword}
        />
      </View>
      <Text>Your OTP is 123456, Kindly user this as your OTP</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={changePasswordHandler}
        disabled={loading}>
        <Text style={{color: '#fff'}}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

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
