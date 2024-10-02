// import React from 'react';
// //import Login from './login'; 
// // import SignUp from './signup';
// // import Search from './search';
// // import Info from './medinfo';
// // import ProductList from './productList';
// // import Splash from './splash';
// // import ProductList from './productList';
// import MedInfo from './medinfo';

// export default function App() {
//   return (
//    //<Login />
//     //<SignUp />
//    // <Search />
//    // <Splash />
//     //<ProductList />
//     <MedInfo />

//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login'; 
import SignUp from './signup'; 
import Splash from './splash';
import Search from './search';
import MedInfo from './medinfo';
import ProductList from './productList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MedInfo">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
        <Stack.Screen name="MedInfo" component={MedInfo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
