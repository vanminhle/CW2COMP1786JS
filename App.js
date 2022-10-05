import {useState, useEffect} from 'react';
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
import {openDatabase} from 'react-native-sqlite-storage';

App = () => {
  const databaseHelper = openDatabase(
    {
      name: 'imagesDatabase',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  /* 
    'https://indiagardening.com/wp-content/uploads/2021/12/Dahlia2.jpg',
    'https://www.farmersalmanac.com/wp-content/uploads/2021/04/forget-me-not-flower-as309740666.jpeg',
  */

  useEffect(() => {
    databaseHelper.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'images ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, url VARCHAR(2083));',
      );
    });
    loadImages();
  }, []);

  const loadImages = () => {
    databaseHelper.transaction(tx => {
      tx.executeSql('SELECT * FROM images ORDER BY id', [], (tx, results) => {
        const tempData = [];
        for (let i = 0; i < results.rows.length; ++i)
          tempData.push(results.rows.item(i));
        setImages(tempData);
      });
    });
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

    databaseHelper.transaction(tx => {
      tx.executeSql(
        'INSERT INTO images (url) VALUES (?)',
        [imageUrl],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            ToastAndroid.show('Image added successfully', ToastAndroid.SHORT);
          } else
            ToastAndroid.show(
              'Problem when adding image. Please try again!',
              ToastAndroid.SHORT,
            );
        },
      );
    });

    setImageUrl('');
    loadImages();
  };

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
        {images.length === 0 ? (
          <Text style={styles.noImageText}>No Image Available</Text>
        ) : (
          <Image
            source={{
              uri: images[imageIndex].url,
            }}
            style={styles.ImageContainer}
          />
        )}
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

  noImageText: {
    width: '100%',
    height: '70%',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
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
