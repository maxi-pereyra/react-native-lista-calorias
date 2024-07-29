import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes/Routes';

export default function App() {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <Routes></Routes>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}
