import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Platform, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Historical() {
    const [location, setLocation] = useState('');
    const [maxTemps, setMaxTemps] = useState([]);
    const [minTemps, setMinTemps] = useState([]);
    const [avgHumidity, setAvgHumididty] = useState([]);
    const [maxWindSpeed, setMaxWindSpeed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState('MaxTemp');

    const getDateRange = () => {
        const dates = [];
        const endDate = new Date();
        let startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);

        while (startDate <= endDate) {
            dates.push(startDate.toISOString().split('T')[0]);
            startDate.setDate(startDate.getDate() + 1);
        }

        return dates;
    };

    const fetchDataForYear = async () => {
        setLoading(true);
        const dates = getDateRange();
        const maxTemps = [];
        const minTemps = [];
        const avgHumidity = [];
        const maxWindSpeed = [];

        for (const date of dates) {
            const url = `http://api.weatherapi.com/v1/history.json?key=a3221b3339e44a3783f124424242608&q=${location}&dt=${date}`;
            try {
                const result = await fetch(url);
                const data = await result.json();
                if (data.forecast && data.forecast.forecastday) {
                    const dayData = data.forecast.forecastday[0].day;
                    maxTemps.push(dayData.maxtemp_c || 0);
                    minTemps.push(dayData.mintemp_c || 0);
                    avgHumidity.push(dayData.avghumidity || 0);
                    maxWindSpeed.push(dayData.maxwind_kph || 0);
                }
            } catch (error) {
                console.error('Error fetching data for date:', date, error);
            }
        }

        setMaxTemps(maxTemps);
        setMinTemps(minTemps);
        setAvgHumididty(avgHumidity);
        setMaxWindSpeed(maxWindSpeed);

        setLoading(false);
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `grey`,
        strokeWidth: 1,
        barPercentage: 1,
    };

    const generateLabels = () => {
        const labels = [];
        const date = new Date();
        for (let i = 0; i < 12; i += 2) { // Increment by 2 to get every other month
            labels.push(date.toLocaleString('default', { month: 'short' }));
            date.setMonth(date.getMonth() - 2); // Move two months back
        }
        return labels.reverse();
    };


    const dataMax = {
        labels: generateLabels(),
        datasets: [{ data: maxTemps.slice(-360), color: (opacity = 1) => `black`, strokeWidth: 2 }],
        legend: ["Maximum Temperature °C - Last 365 days"]
    };

    const dataMin = {
        labels: generateLabels(),
        datasets: [{ data: minTemps.slice(-360), color: (opacity = 1) => `black`, strokeWidth: 2 }],
        legend: ["Minimum Temperature °C - Last 365 days"]
    };

    const dataHum = {
        labels: generateLabels(),
        datasets: [{ data: avgHumidity.slice(-360), color: (opacity = 1) => `black`, strokeWidth: 2 }],
        legend: ["Average Humidity % - Last 365 days"]
    };

    const dataWind = {
        labels: generateLabels(),
        datasets: [{ data: maxWindSpeed.slice(-360), color: (opacity = 1) => `black`, strokeWidth: 2 }],
        legend: ["Maximum Wind Speed kmH - Last 365 days"]
    };

    const graphData = {
        'MaxTemp': dataMax,
        'MinTemp': dataMin,
        'AvgHumidity': dataHum,
        'MaxWindSpeed': dataWind
    };

    const radioOptions = [
        { label: 'Max Temperature', value: 'MaxTemp' },
        { label: 'Min Temperature', value: 'MinTemp' },
        { label: 'Avg Humidity', value: 'AvgHumidity' },
        { label: 'Max Wind Speed', value: 'MaxWindSpeed' }
    ];

    const renderRadioButtons = () => {
        return radioOptions.map((option) => (
            <TouchableOpacity
                key={option.value}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedGraph(option.value)}
            >
                <View style={styles.radioButton}>
                    {selectedGraph === option.value && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioButtonLabel}>{option.label}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Historical Data</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter City"
                    value={location}
                    onChangeText={setLocation}
                />

                <TouchableOpacity style={styles.searchButton} onPress={fetchDataForYear}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                ) : (
                    <View style={styles.dataContainer}>
                        {renderRadioButtons()}
                        <LineChart
                            data={graphData[selectedGraph]}
                            width={Dimensions.get('window').width - 130}
                            height={300}
                            chartConfig={chartConfig}
                            withDots={false}
                            withVerticalLines={false}
                            style={styles.chart}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 32,
        marginBottom: 60,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        textAlign: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 20,
        height: 40,

        ...Platform.select({
            ios: {
                width: 350,
            },
            web: {
                width: 400,
            },
        }),
    },
    searchButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        width: 100,

    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    dataContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',

        borderRadius: 20,
        borderWidth: 2,
        ...Platform.select({
            ios: {
                width: 350,
            },
            web: {
                width: '100%',
            },
        }),
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    radioButtonLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    chart: {
        borderRadius: 0,
        marginTop: 20,
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                borderRadius: 0,
            },
            web: {
                borderRadius: 20,
            },
        }),
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
