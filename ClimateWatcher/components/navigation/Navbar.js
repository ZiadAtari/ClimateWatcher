import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const Navbar = () => {
  const router = useRouter();

  return (

    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/AlertsPage')}>
        <Text style={styles.navText}>Alerts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/HistoricalPage')}>
        <Text style={styles.navText}>Historical</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Wildlife')}>
        <Text style={styles.navText}>Wildlife</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.navButton} onPress={() => router.push('/Settings')}>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333',
    paddingTop: 45,
    ...Platform.select({
      ios: {
        paddingTop: 45,
      },
      web: {
        paddingTop: 10,
      },
    }),
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Navbar;
