// import React, {useState} from 'react';
// import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

// const ChangeAvatar = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Array of image sources
//   const images = [
//     require('../assets/images/male.png'),
//     require('../assets/images/female.png'),
//     require('../assets/images/dog.jpg'),
//     require('../assets/images/femaleTwo.png'),
//     require('../assets/images/snale.png'),
//     require('../assets/images/maleTwo.jpg'),
//   ];
//     // Function to handle image selection
// const handleImageSelection = (index) => {
//         const selectedImg = images[index]; // Get the image source using the index
//         console.log(selectedImg); // Log the selected image source
//         setSelectedImage(selectedImg);
//       };
//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         {images.map((image, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleImageSelection(index)}
//             style={[
//               styles.imgWrapper,
//               selectedImage === image && styles.selectedImage, // Apply a different style for the selected image
//             ]}>
//             <Image style={styles.img} source={image} />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   imgWrapper: {
//     marginVertical: 15,
//     marginHorizontal: 6,
//     borderRadius: 50,
//     overflow: 'hidden',
//   },
//   img: {
//     width: 100,
//     height: 100,
//   },
//   selectedImage: {
//     borderWidth: 2,
//     borderColor: '#900', // Example: Apply a border to indicate the selected image
//   },
// });

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChangeAvatar = ({route}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // console.log(route.params.updateProfile);

  const images = [
    require('../assets/images/male.png'),
    require('../assets/images/female.png'),
    require('../assets/images/dog.jpg'),
    require('../assets/images/femaleTwo.png'),
    require('../assets/images/maleTwo.jpg'),
  ];

  const imagePaths = [
    '../assets/images/male.png',
    '../assets/images/female.png',
    '../assets/images/dog.jpg',
    '../assets/images/femaleTwo.png',
    '../assets/images/maleTwo.jpg',
  ];
  const navigation = useNavigation();

  const handleImageSelection = index => {
    const selectedImgPath = imagePaths[index];
    console.log('Selected Image Path:', selectedImgPath);
    setSelectedImageIndex(index);
  };
  const changeAvatarHandler = () => {
    console.log(imagePaths[selectedImageIndex].split('/').pop());
    if (route?.params?.updateProfile) {
      return navigation.navigate('profile', {
        userAvatar: imagePaths[selectedImageIndex].split('/').pop(),
      });
    } else {
      return navigation.navigate('register', {
        userAvatar: imagePaths[selectedImageIndex].split('/').pop(),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, margin: 20}}>Choose Avatar</Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageSelection(index)}
            style={[
              styles.imgWrapper,
              selectedImageIndex === index && styles.selectedImage,
            ]}>
            <Image style={styles.img} source={image} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={
          !imagePaths[selectedImageIndex]
            ? styles.loginbtnEnbld
            : styles.loginbtn
        }
        onPress={changeAvatarHandler}>
        <Text style={{color: '#fff'}}>Set Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imgWrapper: {
    marginVertical: 15,
    marginHorizontal: 6,
    borderRadius: 50,
    overflow: 'hidden',
  },
  img: {
    width: 100,
    height: 100,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: '#900',
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

export default ChangeAvatar;
