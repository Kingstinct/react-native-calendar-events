/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Platform,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import RNCalendarEvents from 'react-native-calendar-events';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Read/Write Auth</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="Request auth"
                  onPress={() => {
                    RNCalendarEvents.requestPermissions().then(
                      (result) => {
                        Alert.alert('Auth requested', result);
                      },
                      (result) => {
                        console.error(result);
                      },
                    );
                  }}
                />
                <Text>{'\n'}</Text>
                <Button
                  title="Check auth"
                  onPress={() => {
                    RNCalendarEvents.checkPermissions().then(
                      (result) => {
                        Alert.alert('Auth check', result);
                      },
                      (result) => {
                        console.error(result);
                      },
                    );
                  }}
                />
              </Text>
            </View>
            {Platform.OS === 'android' && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Read-Only Auth</Text>
                <Text style={styles.sectionDescription}>
                  <Button
                    title="Request auth"
                    onPress={() => {
                      RNCalendarEvents.requestPermissions(true).then(
                        (result) => {
                          Alert.alert('Read-only Auth requested', result);
                        },
                        (result) => {
                          console.error(result);
                        },
                      );
                    }}
                  />
                  <Text>{'\n'}</Text>
                  <Button
                    title="Check auth"
                    onPress={() => {
                      RNCalendarEvents.checkPermissions(true).then(
                        (result) => {
                          Alert.alert('Read-only Auth check', result);
                        },
                        (result) => {
                          console.error(result);
                        },
                      );
                    }}
                  />
                </Text>
              </View>
            )}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Calendars</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="Find calendars"
                  onPress={() => {
                    RNCalendarEvents.findCalendars().then(
                      (result) => {
                        Alert.alert(
                          'Calendars',
                          result
                            .reduce((acc, cal) => {
                              acc.push(cal.title);
                              return acc;
                            }, [])
                            .join('\n'),
                        );
                      },
                      (result) => {
                        console.error(result);
                      },
                    );
                  }}
                />
              </Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Calendar Events</Text>
            <Text style={styles.sectionDescription}>
              <Button
                title="Find calendar events"
                onPress={() => {
                  RNCalendarEvents.fetchAllEvents(new Date().toISOString(), new Date(Date.now() + 7 * 24 * 60 * 1000 * 60).toISOString()).then(
                    (result) => {
                      console.log('calendarItemExternalIdentifier', result.map(({calendarItemExternalIdentifier}) => calendarItemExternalIdentifier))
                      Alert.alert(
                        'Calendar Events',
                        result
                          .reduce((acc, cal) => {
                            acc.push(cal.title);
                            return acc;
                          }, [])
                          .join('\n'),
                      );
                    },
                    (result) => {
                      console.error(result);
                    },
                  );
                }}
              />
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
