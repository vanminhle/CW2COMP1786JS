import {useState} from 'react';
import {StyleSheet, StatusBar, Text, View, Button, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

App = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const imageList = [
    'https://indiagardening.com/wp-content/uploads/2021/12/Dahlia2.jpg',
    'https://www.farmersalmanac.com/wp-content/uploads/2021/04/forget-me-not-flower-as309740666.jpeg',
  ];

  console.log(imageIndex);

  const prevImage = () => {
    if (imageIndex === 0) {
      setImageIndex(imageList.length - 1);
      return;
    }

    setImageIndex(imageIndex - 1);
  };

  const nextImage = () => {
    if (imageIndex > imageList.length - 2) {
      setImageIndex(0);
      return;
    }

    setImageIndex(imageIndex + 1);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content
          title="Pictures Application"
          color="#ffff"
          titleStyle={{alignSelf: 'center'}}
        />
      </Appbar.Header>
      <StatusBar backgroundColor="#004a9f" barStyle="light-content" />
      <View style={styles.MainContainer}>
        <Image
          source={{
            uri: imageList[imageIndex],
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
