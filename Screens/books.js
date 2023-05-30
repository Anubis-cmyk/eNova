import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'; 
import eNovaBookStore from '../abis/abi.json';
import Web3 from 'web3';


export default function BookList() {
  	const [books, setBooks] = useState([]);
  	const [loading, setLoading] = useState(true);

	 useEffect(() => {
    async function getBooks() {
      const contractAddress = '0x805324ab71EeCDB59f88203d79c7C1e37169783a';

      const web3 = new Web3('https://goerli.infura.io/v3/376e00cbb0684049bfc81287c741e84e');
      const networkId = await web3.eth.net.getId();
      // Create a contract instance for the deployed contract
      const contract = new web3.eth.Contract(eNovaBookStore, contractAddress);

      const  getBookCount = async () => {
          const count = await contract.methods.bookCount().call();
          console.log(count);
      }
      const count = await contract.methods.bookCount().call();
      const bookPromises = [];
      for (let i = 0; i < count; i++) {
        bookPromises.push(contract.methods.getBook(i).call());
      }
      let book;
      const bookData = await Promise.all(bookPromises);
      for (let i = 0; i < count; i++) {
        book = bookData[i];
      }
      console.log(books)
      setBooks(bookData)
     
      setLoading(false)
    }  
    getBooks();
  }, [books]);


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item[0]}</Text>
      <Text style={styles.author}>{item[1]}</Text>
      <Text style={styles.description}>{item[2]}</Text>
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
);}


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
