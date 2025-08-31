import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [animals, setAnimals] = useState([]);

    const handleSearch = () => {
        axios.get(`https://api.api-ninjas.com/v1/animals?name=${searchQuery}`, {
            headers: { 'X-Api-Key': '/LYkxMG8Wr9BJMS0Ou7kSg==b1sW8icj42ChoHgc' }
        })
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderDescription = (label, value) => (
        <Text style={styles.description}>
            <Text style={styles.descriptionLabel}>{label}</Text> {value}
        </Text>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Wildlife Index </Text>
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for an animal..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cardDeck}>
                    {animals.map((animal, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.animalName}>{animal.name}</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {renderDescription('Scientific Name:', animal.taxonomy.scientific_name)}
                                {renderDescription('Kingdom:', animal.taxonomy.kingdom)}
                                {renderDescription('Class:', animal.taxonomy.class)}
                                {renderDescription('Order:', animal.taxonomy.order)}
                                {renderDescription('Family:', animal.taxonomy.family)}
                                {renderDescription('Genus:', animal.taxonomy.genus)}
                                {renderDescription('Locations:', animal.locations.join(', '))}
                                {renderDescription('Main Prey:', animal.characteristics.main_prey)}
                                {renderDescription('Habitat:', animal.characteristics.habitat)}
                                {renderDescription('Predators:', animal.characteristics.predators)}
                                {renderDescription('Diet:', animal.characteristics.diet)}
                                {renderDescription('Average Litter Size:', animal.characteristics.average_litter_size)}
                                {renderDescription('Lifestyle:', animal.characteristics.lifestyle)}
                                {renderDescription('Favorite Food:', animal.characteristics.favorite_food)}
                                {renderDescription('Type:', animal.characteristics.type)}
                                {renderDescription('Slogan:', animal.characteristics.slogan)}
                                {renderDescription('Color:', animal.characteristics.color)}
                                {renderDescription('Skin Type:', animal.characteristics.skin_type)}
                                {renderDescription('Top Speed:', animal.characteristics.top_speed)}
                                {renderDescription('Lifespan:', animal.characteristics.lifespan)}
                                {renderDescription('Weight:', animal.characteristics.weight)}
                            </ScrollView>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    inputSection: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,

    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        textAlign: 'center',
        borderRadius: 20,
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
    cardDeck: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    card: {
        width: 300,
        height: 400,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 8,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                borderWidth: 2,
            },
            web: {
                borderWidth: 0.5,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 6,
                    height: 6,
                },
                shadowRadius: 1,
                shadowOpacity: 1.0,
            },
        }),

        padding: 15,
        margin: 20,
    },
    description: {
        borderBottomWidth: 1,
        padding: 4,
        flexDirection: 'row',
    },
    descriptionLabel: {
        fontWeight: '700'
    },
    animalName: {
        textDecorationLine: 'underline',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    }
});
