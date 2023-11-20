import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {registerProfile, updateProfile} from '../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome';
const Register = ({route}) => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordCVisible, setPasswordCVisible] = useState(true);
  const dispatch = useDispatch();
  const handleImage = () => {
    console.log('Handle Image');
    navigation.navigate('changeavatar', {updateProfile: false});
  };
  const registerHandler = () => {
    dispatch(registerProfile(name, email.toLowerCase(), password, avatar));
    
  };
  // var image  =""
  useEffect(() => {
    if (route.params) {
      if (route.params.userAvatar) {
        setAvatar(route.params.userAvatar);
      }
    }
  }, [route]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        size={100}
        style={{
          backgroundColor: '#900',
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
        source={avatar ? {uri: `asset:/images/${avatar}`} : null}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{color: '#900'}}> Choose Avatar*</Text>
      </TouchableOpacity>
      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          label="Name*"
          style={styles.input}
          placeholder="enter your full name"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          keyboardType="email-address"
          label="E-mail*"
          style={styles.input}
          placeholder="enter your e-mail"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={email}
          onChangeText={setEmail}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            label="Password*"
            secureTextEntry={passwordVisible}
            outlineColor="#900"
            activeOutlineColor="#900"
            style={[styles.input, {flex: 1}]}
            placeholder="enter strong password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={password}
            onChangeText={setPassword}
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
            label="Confirm Password*"
            secureTextEntry={passwordCVisible}
            style={[{flex: 1}]}
            outlineColor="#900"
            activeOutlineColor="#900"
            placeholder="enter strong password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={confirmPassword}
            onChangeText={setconfirmPassword}
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
        {!(password === confirmPassword) && (
          <Text style={{color: '#900', fontSize: 11}}>
            *Password does not match with confirm password*
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={
          !name || !email || !password || !avatar
            ? styles.registerbtnEnbld
            : styles.registerbtn
        }
        disabled={!name || !email || !password || !avatar}
        onPress={registerHandler}>
        <Text style={{color: '#fff'}}>Register</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#900',
            height: 30,
            marginLeft: 20,
            // marginRight: 20,
            marginVertical: 20,
          }}>
          Have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text
            style={{
              color: '#900',
              height: 30,
              marginVertical: 20,
              marginLeft: 5,
              marginRight: 20,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },
  registerbtn: {
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
  registerbtnEnbld: {
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
