import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Checkbox, Dialog} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {deleteTask, loadUser, updateTask} from '../redux/action';

const Task = ({title, description, status, taskId}) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(status);

  const handleCheckbox = () => {
    setCompleted(!completed);

    dispatch(updateTask(taskId));
  };
  const deleteHandler = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this Task?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',

          onPress: async () => {
            await dispatch(deleteTask(taskId));
            dispatch(loadUser());
            console.log('Item deleted!');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View style={{width: '70%'}}>
        <Text style={{fontSize: 20, marginVertical: 7, color: '#900'}}>
          {title}
        </Text>
        <Text numberOfLines={1} style={{color: '#4a4a4a'}}>
          {description}
        </Text>
      </View>
      <Checkbox
        status={completed ? 'checked' : 'unchecked'}
        color="#474747"
        onPress={handleCheckbox}
      />
      <TouchableOpacity onPress={deleteHandler}>
        <Icon
          name="delete"
          color="#fff"
          size={20}
          style={{
            backgroundColor: '#900',
            padding: 10,
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Task;
