import {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Button,
  Image,
  ToastAndroid,
} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

App = () => {
  const [images, setImages] = useState([
    'https://indiagardening.com/wp-content/uploads/2021/12/Dahlia2.jpg',
    'https://www.farmersalmanac.com/wp-content/uploads/2021/04/forget-me-not-flower-as309740666.jpeg',
  ]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const prevImage = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
      return;
    }

    setImageIndex(imageIndex - 1);
  };

  const nextImage = () => {
    if (imageIndex > images.length - 2) {
      setImageIndex(0);
      return;
    }

    setImageIndex(imageIndex + 1);
  };

  const addImage = () => {
    if (imageUrl.length === 0) {
      ToastAndroid.show('Please input image url', ToastAndroid.SHORT);
      return;
    }

    if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) === null) {
      ToastAndroid.show('Image url is invalid!', ToastAndroid.SHORT);
      return;
    }

    images.push(imageUrl);
    setImageUrl('');
    ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Pictures Application" color="#ffff" />
        <Appbar.Action icon="check" onPress={() => addImage()} />
        <Appbar.Action icon="camera" />
      </Appbar.Header>
      <StatusBar backgroundColor="#004a9f" barStyle="light-content" />
      <View style={styles.MainContainer}>
        <TextInput
          mode="outlined"
          label="Image URL"
          value={imageUrl}
          onChangeText={imageUrl => setImageUrl(imageUrl)}
        />
        <Image
          source={{
            uri: images[imageIndex],
          }}
          style={styles.ImageContainer}
        />
        <View style={styles.buttonContainer}>
          <View style={{width: '48%'}}>
            <Button title="Previous" onPress={() => prevImage()} />
          </View>
          <View style={{width: '48%'}}>
            <Button title="Next" onPress={() => nextImage()} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
  },

  ImageContainer: {
    width: '100%',
    height: '70%',
    marginBottom: 20,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    textAlign: 'center',
    margin: 12,
    fontSize: 22,
    fontWeight: '100',
  },
});

export default App;
