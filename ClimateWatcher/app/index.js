import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Pressable, Linking, Platform } from 'react-native';
import axios from 'axios';

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Weather OR Climate OR Environment OR ocean OR nature OR storm OR drought OR heatwave OR coldwave',
            apiKey: '0d2aa2e4c4d54d7494a1ce5564dbcb43',
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Title Section */}
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>ClimateWatcher</Text>
          </View>

          {/* Content Section */}
          <View style={styles.contentBox}>
            <Text style={styles.headerText}>
              Climate Research Companion with access to:
            </Text>
            <Text style={styles.bodyText}>- Historical Weather data up to 365 days prior</Text>
            <Text style={styles.bodyText}>- Real-Time Worldwide seismic activity alerts</Text>
            <Text style={styles.bodyText}>- Worldwide data collection</Text>
          </View>

          {/* News Section */}
          <View style={styles.newsSection}>
            <Text style={styles.newsHeader}>Latest News</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {articles.slice(0, 10).map((article, index) => (
                  <Pressable
                    key={index}
                    style={styles.articleBox}
                    onPress={() => handlePress(article.url)}
                  >
                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {article.title}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentBox: {
    flex: 1.5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 40,
    paddingTop: 30,
    marginBottom: 30
  },
  headerText: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666666',
    marginBottom: 5,
    paddingLeft: 10,
  },
  newsSection: {

    ...Platform.select({
      ios: {
        flex: 2.5,
      },
      web: {
        marginTop: 100,
        height: 500,
      },

    }),

    padding: 20,
  },
  newsHeader: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 60,
  },
  articleBox: {
    width: 345,
    height: 150,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.5,

    ...Platform.select({
      ios: {
        borderWidth: 2,

      },
      web: {
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 6 },
        shadowRadius: 1,
        shadowOpacity: 1.0,
      },
    }),
    padding: 10,
  },
  articleTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
