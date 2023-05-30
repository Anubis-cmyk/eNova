import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import BookList from './Screens/books';

export default function App() {
  return ( 
     <BookList/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },

  navbarWrap: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    width: '100%',
    height: 80,
  },
  brandText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold', 
    marginLeft: 30,
    marginTop: 30,
    width: '50%',

  },
  navbar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    height: 40,
    marginTop: 30,
    marginRight: 30,
  }



});
