import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const ITEMS_PER_PAGE = 10;

const Task = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          _page: page,
          _limit: ITEMS_PER_PAGE,
        },
      });
      const newData = response.data;

      setData((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  };

  const renderError = () => {
    if (error) {
      return (
        <View>
          <Text>Error fetching data</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderEmpty = () => {
    if (!loading && data.length === 0) {
      return (
        <View>
          <Text>No data available</Text>
        </View>
      );
    }
    return null;
  };

  const ListOfItems = React.memo(({ item }) => (
    <View style={styles.itemContainer}>
      <Text numberOfLines={1} style={styles.titleText}>
        {"Title: " + item.title}
      </Text>
      <Text numberOfLines={2} style={styles.descriptionText}>
        {"Description: " + item.body}
      </Text>
    </View>
  ));

  return (
    <View style={{ flex: 1 }}>
      {renderError()}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListOfItems item={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = {
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
};

export default Task;
