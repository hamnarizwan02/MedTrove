// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import { registerRootComponent } from 'expo';
import App from './App';

// Ensure App is correctly registered and handle potential errors
try {
  registerRootComponent(App);
} catch (error) {
  console.error("Error registering the root component:", error);
}


