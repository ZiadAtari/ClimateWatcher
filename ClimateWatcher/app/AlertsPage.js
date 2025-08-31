import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function AlertsPage() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [maxMagnitude, setMaxMagnitude] = useState(10);

  const fetchEarthquakeData = async () => {
    try {
      const response = await axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&maxmagnitude=${maxMagnitude}&minmagnitude=${minMagnitude}`);
      const features = response.data.features;
      setEarthquakes(features);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderDescription = (label, value) => (
    <Text style={styles.text}>
      <Text style={styles.textL}>{label}</Text> {value}
    </Text>
  );

  useEffect(() => {
    fetchEarthquakeData();
  }, [minMagnitude, maxMagnitude]);

  const handleFilterChange = (min, max) => {
    setLoading(true);
    setMinMagnitude(min);
    setMaxMagnitude(max);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earthquake Alerts</Text>
      <View style={styles.contentContainer}>
        <View style={styles.sidebar}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}> Magnitude </Text>
          <TouchableOpacity onPress={() => handleFilterChange(0, 3)} style={styles.sidebarButton}>
            <Text style={styles.sidebarButtonText}>0-3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange(3, 5)} style={styles.sidebarButton}>
            <Text style={styles.sidebarButtonText}>3-5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange(5, 7)} style={styles.sidebarButton}>
            <Text style={styles.sidebarButtonText}>5-7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange(7.0, 9.9)} style={styles.sidebarButton}>
            <Text style={styles.sidebarButtonText}>7-10</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={earthquakes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const { mag, time, place } = item.properties;
            const [longitude, latitude] = item.geometry.coordinates;

            // Time Converter
            const date = new Date(time);
            const formattedTime = date.toLocaleString();

            return (
              <View style={styles.itemContainer}>
                <Text style={styles.textH}>Mag: {mag}</Text>
                {renderDescription('Lat:', latitude)}
                {renderDescription('Long:', longitude)}
                {renderDescription('Time:', formattedTime)}
                {renderDescription('Location:', place)}
              </View>
            );
          }}
          style={styles.flatList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',

  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 100,
    paddingRight: 10,
    borderRightWidth: 1,
  },
  sidebarButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  sidebarButtonText: {
    fontSize: 16,
  },
  textH: {
    fontSize: 20,
    marginVertical: 2,
    fontWeight: 'bold',

  },
  textL: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  itemContainer: {
    height: 200,
    padding: 20,
    borderBottomWidth: 1,
  },
  flatList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
