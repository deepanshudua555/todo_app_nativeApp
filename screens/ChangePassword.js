import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loadUser, login, updatePassword} from '../redux/action';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCPassword, setNewCPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordCVisible, setPasswordCVisible] = useState(true);
  const changePasswordHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    navigation.goBack();
  };

  //   useEffect(() => {
  //     if (error) {
  //       console.log(error + 'I am error');
  //       Alert.alert('Invalid old Password', error, [{text: 'try again'}], {
  //         cancelable: false,
  //       });
  //       dispatch({type: 'clearError'});
  //     }
  //   }, [error, dispatch, Alert]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, margin: 20}}>Change Your Password</Text>
      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          label="Old Password*"
          style={styles.input}
          placeholder="enter your old password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            outlineColor="#900"
            activeOutlineColor="#900"
            label="New Password*"
            style={[styles.input, {flex: 1}]}
            secureTextEntry={passwordVisible}
            placeholder="enter your new password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={newPassword}
            onChangeText={setNewPassword}
          />
                    <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#900"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            outlineColor="#900"
            activeOutlineColor="#900"
            label="New Confirm Password*"
            style={[{flex: 1}]}
            secureTextEntry={passwordCVisible}
            placeholder="enter your new password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={newCPassword}
            onChangeText={setNewCPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordCVisible(!passwordCVisible)}>
            <Icon
              name={passwordCVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#900"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!(newPassword === newCPassword) && (
        <Text style={{color: '#900', fontSize: 11}}>
          *Password does not match with confirm password*
        </Text>
      )}
      <TouchableOpacity
        style={
          !oldPassword || !newPassword ? styles.loginbtnEnbld : styles.loginbtn
        }
        disabled={!oldPassword || !newPassword}
        onPress={changePasswordHandler}>
        <Text style={{color: '#fff'}}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },
  loginbtn: {
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
  loginbtnEnbld: {
    backgroundColor: '#900',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
    opacity: 0.5,
  },
});
