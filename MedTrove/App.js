import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login'; 
import SignUp from './signup'; 
import Splash from './splash';
import Search from './search';
import MedInfo from './medinfo';
import ProductList from './productList';
import ProfileManagement from './profilemangement';
import MedicationInfo from './APITest';
import Cart from './Cart';
import Pharmacy from './pharmacy';
import DrugInteractionScreen from './DDI';
import ChoosePayment from './ChoosePayment';
import AddInformation from './AddInformation';
import PaymentInformation from './PaymentInformation';
import ReviewPaymentPage from './ReviewPaymentPage';
import SearchPage from './searchPage';
import Donation from './Donation';
import MakeDonation from './MakeDonation'
import StripeWebView from './StripeWebView';
import StripeWebViewDonation from './StripeWebViewDonation';
import AddMedicationScreen from './AddMedicationScreen';
import homepagetest from './homepagetest';
import MedicationListScreen from './MedicationListScreen';
import Medibot from './Medibot';
import OrderHistory from './OrderHistory';
import { StripeProvider } from '@stripe/stripe-react-native';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Set up response handler
Notifications.addNotificationResponseReceivedListener((response) => {
    // When notification is tapped, clear it
    Notifications.dismissNotificationAsync(response.notification.request.identifier);
  });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="sk_test_51QmvIF07WWhTO31txQtIXqvhXvPzWgNqQ71NxY6mh3DTkg3Kh3bUFjaMHwvh1OcYXnxcprkkJR4gFSX58vjgCe2400ifIevHTL" 
     merchantIdentifier="merchant.com.yourapp">
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">

      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
        <Stack.Screen name="MedInfo" component={MedInfo} 
        // options={{ 
        //       headerShown: true,  
        //       headerTitle: "",    
        //       headerStyle: { backgroundColor: '#f8f9fa', },
        //       headerTintColor: '#064D65',    // color the back button
        //     }} 
        options={{ headerShown: false }}
             /> 
        <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />    
        {/* api test page */}
        <Stack.Screen name="MedicationInfo" component={MedicationInfo} options={{headerShown: false}} />  
        <Stack.Screen name="Pharmacy" component={Pharmacy} options={{ headerShown: false }} />
        <Stack.Screen name="DrugInteractionScreen"  component={DrugInteractionScreen} options={{ headerShown: false }} />
        
        <Stack.Screen name="ChoosePayment" component={ChoosePayment} options={{ headerShown: false }} />
        <Stack.Screen name="AddInformation" component={AddInformation} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentInformation" component={PaymentInformation} options={{ headerShown: false }} />
        <Stack.Screen name="ReviewPaymentPage" component={ReviewPaymentPage} options={{ headerShown: false }} />
        <Stack.Screen name="StripeWebView" component={StripeWebView} options={{ headerShown: false }}/>
        <Stack.Screen name="StripeWebViewDonation" component={StripeWebViewDonation} options={{ headerShown: false }}/>

        <Stack.Screen name="Donation" component={Donation} options={{headerShown: false}} />
        <Stack.Screen name="MakeDonation" component={MakeDonation} options={{headerShown: false}} />

        <Stack.Screen name="AddMedicationScreen" component={AddMedicationScreen} options={{headerShown: false}} />
        <Stack.Screen name="MedicationListScreen" component={MedicationListScreen} options={{headerShown: false}} />
        <Stack.Screen name="Medibot" component={Medibot} options={{headerShown: false}} />
        <Stack.Screen name="homepagetest" component={homepagetest} options={{headerShown: false}} />   

        <Stack.Screen name="OrderHistory" component={OrderHistory} options={{headerShown: false}} />   

        

      </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
    );
}
