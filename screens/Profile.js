import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logout, updateProfile} from '../redux/action';
import Loader from '../components/Loader';

const Profile = ({navigation, route}) => {
  const {user, loading} = useSelector(state => state.auth);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);

  const dispatch = useDispatch();

  const handleImage = () => {
    console.log('Handle Image');
    navigation.navigate('changeavatar', {
      updateProfile: true,
    });
  };
  const submitHandler = async () => {
    await dispatch(updateProfile(name, avatar));
    dispatch(loadUser());
  };
  const logoutHandler = () => {
    dispatch(logout());
    // navigation.navigate('login');
  };
  useEffect(() => {
    if (route.params) {
      if (route.params.userAvatar) {
        setAvatar(route.params.userAvatar);
      }
    }
  }, [route]);
  return loading ? (
    <Loader />
  ) : (
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
        source={
          avatar
            ? {uri: `asset:/images/${avatar}`}
            : require('../assets/images/dog.jpg')
        }
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{color: '#900'}}> Change Avatar</Text>
      </TouchableOpacity>

      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          outlineColor="#900"
          activeOutlineColor="#900"
          label="Name"
          style={styles.input}
          placeholder="enter your full name"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={{width: '70%'}}>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.input}
          placeholder="enter your full name"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={user?.email}
          disabled
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.submitBtn} onPress={submitHandler}>
          <Text style={{color: '#fff'}}>Update</Text>
        </TouchableOpacity>
        {user.verified ? null : (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => navigation.navigate('verify')}>
            <Text style={{color: '#fff'}}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
        {/* <Text>type this as your OTP {user?.otp}</Text> */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.logoutCPBtn}
          onPress={() => navigation.navigate('changepassword')}>
          <Text style={{color: '#900'}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutCPBtn} onPress={logoutHandler}>
          <Text style={{color: '#900'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },
  submitBtn: {
    backgroundColor: '#900',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
    elevation: 5,
  },
  logoutCPBtn: {
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitBtnEnbld: {
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
