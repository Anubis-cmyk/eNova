import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ethers } from 'ethers';
import eNovaBookStore from '../abis/abi.json';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
	useEffect(() => { 

    const infuraEndpoint = 'https://goerli.infura.io/v3/376e00cbb0684049bfc81287c741e84e';
	const provider = new ethers.providers.InfuraProvider('goerli','376e00cbb0684049bfc81287c741e84e');
    const contractAddress = '0x805324ab71EeCDB59f88203d79c7C1e37169783a';
	const bookstoreContract = new ethers.Contract(contractAddress, eNovaBookStore, provider);

     async function getBookCount() {
      const bookCount = await bookstoreContract.bookCount();
      return bookCount.toNumber();
    }
 	
	async function getBooks() {
      const bookCount = await getBookCount();
      const newBooks = [];
      for (let i = 0; i < bookCount; i++) {
        const book = await bookstoreContract.getBook(i);
        newBooks.push({
          title: book[0],
          author: book[1],
          description: book[2],
        });
      }
      setBooks(newBooks);
      setLoading(false);
    }

    // Call the getBooks function when the component mounts
    getBooks();
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  author: {
    fontSize: 24,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
  },
});
