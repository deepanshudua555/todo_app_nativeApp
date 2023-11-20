import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/action';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login = () => {
  const {error} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const loginHandler = () => {
    dispatch(login(email.toLowerCase(), password));
  };
  useEffect(() => {
    console.log(error);
    if(error === "Login First" || error === undefined || error === null){
      console.log("bach gya");
      dispatch({type: 'clearError'});
    }
    // if (error)  {
    else {
      console.log(error + 'I am error');
      navigation.navigate('register')
      Alert.alert('Invalid Credentials', error, [{text: 'try again'}], {
        cancelable: false,
      });
      dispatch({type: 'clearError'});
    }
  }, [error, dispatch, Alert]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, margin: 20}}>WELCOME</Text>
      <View style={{width: '70%'}}>
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          label="E-mail*"
          style={styles.input}
          placeholder="enter your registered e-mail"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={email}
          onChangeText={setEmail}
        />
        {/* <TextInput
          mode="outlined"
          label="Password"
          style={styles.input}
          secureTextEntry
          placeholder="enter your password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={password}
          onChangeText={setPassword}
        /> */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '116%'}}>
          <TextInput
            mode="outlined"
            outlineColor="#900"
            activeOutlineColor="#900"
            label="Password*"
            style={[styles.input, {flex: 1}]}
            secureTextEntry={passwordVisible}
            placeholder="enter your password"
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
      </View>
      <TouchableOpacity
        style={{alignSelf: 'flex-start', marginLeft: '15%'}}
        onPress={() => navigation.navigate('forgetpassword')}>
        <Text
          style={{
            color: '#900',
          }}>
          forget password
        </Text>
      </TouchableOpacity>

      {/* <Button
        disabled={!email || !password}
        style={styles.loginbtn}
        onPress={loginHandler}>
        <Text style={{color: '#fff'}}>Login</Text>
      </Button> */}
      <TouchableOpacity
        style={!email || !password ? styles.loginbtnEnbld : styles.loginbtn}
        disabled={!email || !password}
        onPress={loginHandler}>
        <Text style={{color: '#fff'}}>Login</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 20}}>Or</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text style={{color: '#900', height: 30, margin: 20}}>Sign Up</Text>
      </TouchableOpacity> */}
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: '#900',
            height: 30,
            marginLeft: 20,
            // marginRight: 20,
            marginVertical: 20,
          }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text
            style={{
              color: '#900',
              height: 30,
              marginVertical: 20,
              marginLeft: 5,
              marginRight: 20,
              fontWeight: 'bold',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
    // marginRight:15
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
