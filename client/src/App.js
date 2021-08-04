import './App.css';
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import SignIn from './components/SignIn';
import Signup from './components/SignUp';

const httpLink = createHttpLink({
  uri: '/graphql',
});

function App() {

  return (
    <div>
      <SignIn/>
    </div>
  )
}

export default App;
