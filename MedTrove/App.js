// import React from 'react';
// import Login from './login'; 
// import SignUp from './signup';

// export default function App() {
//   return (
//     <Login />
//     //<SignUp />
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login'; 
import SignUp from './signup'; 
import Splash from './splash';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
