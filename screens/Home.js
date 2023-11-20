import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/Entypo';
import {Dialog, Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, loadUser} from '../redux/action';
// import { useNavigation } from '@react-navigation/native'

const Home = ({navigation}) => {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const {loading, message, error} = useSelector(state => state.message);
  const [selectedTask, setSelectedTask] = useState({
    title: '',
    description: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogTask, setOpenDialogTask] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const hideOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  const hideOpenDialogTask = () => {
    console.log(openDialogTask, ' openDialogTask');
    setOpenDialogTask(!openDialogTask);
  };
  const handleTaskPress = item => {
    setSelectedTask({title: item.title, description: item.description});
    setOpenDialogTask(true);
  };
  const addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      Alert.alert('ERROR', error, [{text: 'ok'}], {
        cancelable: false,
      });
      dispatch({type: 'clearError'});
      
    }
    if (message) {
      Alert.alert('MESSAGE', message, [{text: 'ok'}], {
        cancelable: false,
      });
      dispatch({type: 'clearMessage'});
    }
  }, [Alert, error, message, dispatch]);

  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View style={styles.heading}>
          <View style={{width: '75%', paddingLeft: 55, marginLeft: 15}}>
            <Text style={styles.headingTxt}>All Tasks</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={hideOpenDialog}>
            <Icon name="add-to-list" size={15} color="#900" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <SafeAreaView>
            {user &&
              user.task.map(item => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleTaskPress(item)}>
                  <Task
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.completed}
                    taskId={item._id}
                  />
                </TouchableOpacity>
              ))}
          </SafeAreaView>
        </ScrollView>
      </View>

      <Dialog visible={openDialogTask} onDismiss={hideOpenDialogTask}>
        <Dialog.Title>Your Task</Dialog.Title>
        <Dialog.Content>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize: 17, color: '#900'}}>
              Title:{' '}
            </Text>
            <Text>{selectedTask.title}</Text>
          </View>
          <View style={{flexDirection:'row', alignContent :'center', width:"70%"}}>
            <Text style={{fontSize: 17, color: '#900'}}>
              Description:{' '}
            </Text>
            <Text>{selectedTask.description}</Text>
          </View>
          {/* <Text>Description: {selectedTask.description}</Text> */}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideOpenDialogTask}>Close</Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={openDialog} onDismiss={hideOpenDialog}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Title"
            style={styles.input}
            placeholder="Give title to your task "
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            mode="outlined"
            label="Description"
            style={styles.input}
            placeholder="Give Description to your task "
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={description}
            onChangeText={setDescription}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={hideOpenDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button
              onPress={addTaskHandler}
              textColor="#900"
              disabled={!title || !description || loading}>
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#474747',
    alignItems: 'center',
  },
  headingTxt: {
    fontSize: 28,
    textAlign: 'center',
    // marginTop: 25,
    // marginBottom: 20,
    color: '#fff',
    backgroundColor: '#474747',
  },
  addBtn: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 20,
    marginHorizontal: 25,
    elevation: 5,
  },
  input: {
    borderRadius: 5,
    marginVertical: 15,
  },
});
