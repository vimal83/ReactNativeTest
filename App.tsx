/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import database from '@react-native-firebase/database';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const reference = database().ref('/Category/1');

  const readfromDB = () => {
    database()
      .ref('/Category/1')
      .once('value')
      .then(snapshot => {
        console.log('catgory data: ', snapshot.val());
      });
  };

  const [array, setArray] = useState([]);
  const readAllfromDB = () => {
    const category = database()
      .ref('Category')
      .once('value', function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
          var userKey = userSnapshot.key;
          var userData = userSnapshot.val();
          // userData['id'] = userKey;
          if (userData != null) {
            console.log(userData.Name.toString());
            setArray((oldArray: any) => [
              ...oldArray,
              userData.Name.toString(),
            ]);
          }
        });
      });
    console.log('array value ' + {array});
  };

  const writeToDB = () => {
    database()
      .ref('/Category/3')
      .set({
        Name: 'Jeans',
        Active: 0,
      })
      .then(() => console.log('Data set.'));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={styles.btn}>
          <Button title="read" onPress={readfromDB} />
        </View>
        <View style={styles.btn}>
          <Button title="read all" onPress={readAllfromDB} />
          <View style={{backgroundColor: '#004563', marginTop: 10}}>
            {array.map(e => (
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                {e}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.btn}>
          <Button title="read" onPress={writeToDB} />
        </View>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  btn: {
    marginTop: 20,
  },
});

export default App;
