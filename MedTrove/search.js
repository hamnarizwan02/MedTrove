import * as React from "react";
import { Image,Text,View, TextInput, Button,TouchableOpacity,ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import CONFIG from './config.js'; 
import { useNavigation } from '@react-navigation/native';
import ProfileManagement from './profilemangement';


const navigateToProfilePage = () => {
      const navigation = useNavigation();
      navigation.navigate('Profilemanagement'); // Replace 'ProfilePage' with the actual name of your profile page
    };

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  searchText: 'Initial search value', // Set the initial value here
		  status: undefined,
		};
	  }

	  //This funxtion is to implement the search 

	  MySearchBar = () => {
		const [status, setStatus] = useState(undefined);
		const getKeyboardStatus = () => {
		  const isVisible = Keyboard.isVisible();
		  const currentState = isVisible ? 'opened' : 'closed';
		  setStatus(currentState);
		};
	  
		useEffect(() => {
		  getKeyboardStatus();
		}, []);

		// taking input of search 
		return (
			<TextInput
			  placeholder="Search..."
			//  onFocus={() => Keyboard.show()}
			 // value={searchText}
			 onChangeText={(text) => {
				setSearchText(text);
			  }}
			  onSubmitEditing={this.handleSearchSubmit}
			/>
		  );
	};


	handleSearchSubmit = async () => {
		Keyboard.dismiss();
		console.log('Search text:', this.state.searchText); // Log the search text
		const searchTerm = this.state.searchText;
		console.log('Search term:', searchTerm);
		
		try {
			const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${searchTerm}`);
			const medicine = response.data; // Medicine object from API response
			console.log('Found medicine:', medicine);
			
			// Check if the medicine is an object and contains the _id
			if (typeof medicine === 'object' && medicine !== null && medicine._id) {
				console.log(medicine._id);
				this.props.navigation.navigate('ProductList', { id: medicine._id });
			} else {
				console.error('Medicine ID not found in response:', medicine);
			}
		} catch (error) {
			console.error('Error fetching medicine:', error);
		}
	};
	
  	render(){
		const { searchText } = this.state;
  	return (
			
    		<View style={styles.view}>
      			<View style={[styles.header, styles.titleLayout]}>
        				<Image style={[styles.icon, styles.iconLayout1]} resizeMode="cover" source="icon.png" />
        				<Text style={[styles.home, styles.homePosition]}>Home</Text>
        				<Image style={[styles.icon1, styles.icon1Position]} resizeMode="cover" source="icon.png" />
      			</View>

				  <View style={styles.search}>
			  <TextInput
          		placeholder="Search..."
          		onChangeText={(text) => {
            	this.setState({ searchText: text });
           	 	 console.log('Search text updated:', text); // Print the updated search text
          }}
          onSubmitEditing={this.handleSearchSubmit}

				
		></TextInput><Image style={[styles.icon2, styles.iconLayout1]} resizeMode="cover" source="icon.png" />
			
       
          </View>
      			<View style={[styles.card, styles.cardPosition]}>
                       
        				<View style={[styles.rectangle1, styles.rectangleShadowBox]} />
        				<Text style={[styles.weWillDeliver, styles.topCompany1Typo]}>We will deliver your medicines safely</Text>
        				<View style={[styles.button, styles.imagePosition1]}>
          					<View style={[styles.rectangle2, styles.rectanglePosition]} />
          					<Text style={[styles.orderNow, styles.text6Position]}>Order Now</Text>
        				</View>
        				<View style={[styles.image, styles.imagePosition1]}>
                                <Image source={require('./assets/heart.png')} style={[styles.imageCard]} resizeMode="cover" />
        				</View>
      			</View>
      			<View style={styles.topCompany}>
        				<View style={[styles.title, styles.titleLayout]}>
          					<Text style={[styles.topCompany1, styles.topCompany1Typo]}>Services</Text>
{/*-------------Add a scroll view---------------------	 */}
        				</View>
				{/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}> */}
        				
                              {/* Donation Button */}
                              <View style={[styles.card1, styles.cardLayout1]}>
          					<View style={[styles.rectangle3, styles.rectangleShadowBox]} />
                                        <Image source={require('./assets/virus button.png')} style={[styles.imageCard]} resizeMode="cover" />
          					
          					<Text style={[styles.wendy, styles.wendyPosition]}>Donations</Text>
        				</View>
                               {/* Chatbot Button */}
        				<View style={[styles.card2, styles.cardLayout1]}>
          					<View style={[styles.rectangle4, styles.rectangleShadowBox]} />
                                        <Image source={require('./assets/chatbot.png')} style={[styles.imageCard]} resizeMode="cover" />
          				
          					<Text style={[styles.camelia, styles.wendyPosition]}>{`Medibot `}</Text>
        				</View>

                                  {/* ADD DDI IMAGE HERE HAMNA */}
        				<View style={[styles.card3, styles.cardLayout1]}>
          					<View style={[styles.rectangle5, styles.rectangleShadowBox]} />
                                        <Image source={require('./assets/DrugIdentifier.jpeg')} style={[styles.imageCard]} resizeMode="cover" />
          				
          					<Text style={[styles.jordan, styles.wendyPosition]}>Jordan</Text>
        				</View>
        				{/* <TouchableOpacity onPress={() => navigateToProfilePage()}>
                                    <View style={[styles.card4, styles.cardLayout1]}>
                                          <View style={[styles.rectangle6, styles.rectangleShadowBox]} />
                                                 <Image source={require('./assets/profilebtn.png')} style={[styles.imageCard]} resizeMode="cover" />
                                                 <Text style={[styles.brian, styles.wendyPosition]}>Profile</Text>
                                           </View>
                              </TouchableOpacity> */}
                        
                           
                              <View style={[styles.card4, styles.cardLayout1]}>
                                          <View style={[styles.rectangle6, styles.rectangleShadowBox]} />
                                          <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileManagement")}>
                                                 <Image source={require('./assets/profilebtn.png')} style={[styles.imageCard]} resizeMode="cover" />
                                                 </TouchableOpacity>
                                                 <Text style={[styles.brian, styles.wendyPosition]}>Profile</Text>
                                           </View>
                              

						{/* </ScrollView> */}
      			</View>
			{/*Pharmacy Locatopr*/}
      			<View style={styles.popularProducts}>
        				<View style={[styles.title, styles.titleLayout]}>
          					<Text style={[styles.topCompany1, styles.topCompany1Typo]}>Pharmacy Locator</Text>
          					
        				</View>
        				
            			<View style={[styles.card7, styles.cardLayout]}>	
                                        <Image source={require('./assets/pharma.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          					
       				</View>
      			</View>
      			
    		</View>
        );
    }
}

const styles = StyleSheet.create({

	horizontalScrollContainer: {
		flex: 1,
		flexDirection: 'row',
		overflowX: 'scroll',
		height:100,
	  },

    container: {
      flex: 1, // Make the container take the full height of the screen
      padding: 10, // Adds padding to the container
      backgroundColor: "#fafafa", // Set a background color if needed
    },
  
        titleLayout: {
              height: 25,
              width: 386,
              position: "absolute",
              overflow: "hidden"
        },
        iconLayout1: {
              maxHeight: "100%",
              maxWidth: "100%"
        },
        homePosition: {
              //fontFamily: "Arial",
              letterSpacing: 1,
              top: "50%",
              position: "absolute"
        },
        icon1Position: {
              right: "0%",
              position: "absolute",
              overflow: "hidden"
        },
  
        cardPosition: {
              width: 386,
          position: "relative",
              left: 14,
          height:135,
              position: "absolute"
        },
        text6Clr: {
              color: "#d6d9da",
              textAlign: "left"
        },
        rectangleShadowBox: {
              shadowOpacity: 1,
              elevation: 48,
              shadowRadius: 48,
              shadowOffset: {
                    width: 0,
                    height: 2
              },
              shadowColor: "rgba(0, 0, 0, 0.04)",
              backgroundColor: "transparent",
              borderRadius: 12
        },
        topCompany1Typo: {
              fontWeight: "500",
              color: "#252828",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              top: "50%",
              position: "absolute"
        },
        imagePosition1: {
              bottom: "10.94%",
              position: "absolute"
        },
        rectanglePosition: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        text6Position: {
              fontSize: 12,
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        maskBg: {
              backgroundColor: "#e8ebf1",
              borderRadius: 12
        },
        cardLayout1: {
              height: 122,
              width: 94,
              top: 39,
              position: "absolute",
              overflow: "hidden"
        },
        wendyPosition: {
              marginTop: 33,
              color: "#96a2a3",
              fontSize: 12,
              fontWeight: "500",
              textAlign: "center",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
       
        mask5Layout: {
              height: 100,
              width: 122,
              position: "absolute"
        },
        textPosition1: {
              height: 45,
              top: 128,
              position: "absolute",
              overflow: "hidden"
        },
        fireSyrupPosition: {
              marginTop: -22.5,
              fontWeight: "500",
              fontSize: 14,
              textAlign: "center",
              color: "#252828",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        textClr: {
              color: "#1b3c74",
              fontWeight: "500"
        },
        card8Layout: {
              height: 290,
              left: 0,
              width: 386,
              position: "absolute"
        },
        mask8Layout: {
              height: 188,
              width: 358,
              position: "absolute"
        },
        xxxXxxxSpaceBlock: {
              marginLeft: -179,
              textAlign: "left"
        },
        iconLayout: {
              bottom: "7.14%",
              top: "7.14%",
              width: "10.66%",
              height: "85.71%",
              maxHeight: "100%",
              maxWidth: "100%",
              position: "absolute",
              overflow: "hidden"
        },
        xxxXxxxPosition: {
              marginTop: -6,
              fontSize: 12,
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        icon: {
              width: "5.7%",
              right: "94.3%",
              left: "0%",
              bottom: "0%",
              top: "5.26%",
              height: "94.74%",
              maxHeight: "100%",
              maxWidth: "100%",
              position: "absolute",
              overflow: "hidden"
        },
        home: {
              marginLeft: -25,
              fontWeight: "600",
              textAlign: "center",
              color: "#252828",
              fontSize: 16,
              left: "50%",
              marginTop: -9.5
        },
        icon1: {
              width: "0.52%",
              left: "99.48%",
              maxHeight: "100%",
              maxWidth: "100%",
              bottom: "0%",
              top: "5.26%",
              height: "94.74%"
        },
        header: {
              top: 48,
              left: 14
        },
        rectangle: {
              borderStyle: "solid",
              borderColor: "#eaebec",
              borderWidth: 1,
              backgroundColor: "#fff",
              borderRadius: 12,
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        icon2: {
              height: "33.33%",
              width: "4.15%",
              top: "33.33%",
              right: "92.23%",
              bottom: "33.33%",
              left: "3.63%",
              position: "absolute",
              overflow: "hidden"
        },
      searchCard: {
          backgroundColor: "#fff",
          borderRadius: 12,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 5, // Android shadow
          padding: 10, // Adds padding inside the card
           // Space below the search card
      },
      search: {
        flexDirection: "row", // Align the icon and text horizontally
        alignItems: "center", // Center items vertically
        backgroundColor: "#f1f1f1", // Background for the search bar
        borderRadius: 10,
        top:95,
        left:60,
        paddingHorizontal: 10, // Horizontal padding for space inside
        height: 40, // Height of the search bar
        width: 300, // Width of the search bar
    },
  
      searchText: {
      fontSize: 16, // Font size for search text
      color: "#999", // Light color for placeholder text
    },
  
        rectangle1: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        weWillDeliver: {
              marginTop: -50,
              width: "44.82%",
              lineHeight: 22,
              textAlign: "left",
              left: "3.63%",
              fontSize: 15.5,
        },
        rectangle2: {
              borderRadius: 21,
              backgroundColor: "#1b3c74"
        
        },
  
      
        orderNow: {
              marginLeft: -42,
              textTransform: "uppercase",
              fontWeight: "700",
              color: "#fff",
              marginTop: -7,
              fontSize: 12,
              textAlign: "center",
          
        },
  
      button: {
        height: 40, // set a fixed height
        width: 150, // set a fixed width
        justifyContent: "center", // center the text vertically
        alignItems: "center", // center the text horizontally
        backgroundColor: "#1b3c74", // button background color
        borderRadius: 21, // rounded corners
        marginLeft: 10, // add margin to space it from the text if necessary
      },
        mask: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        imageCard:{
            top: "0%",
              height: 100,
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: 100

        },
        image: {
              height: "78.13%",
              width: "31.09%",
              top: "10.94%",
              right: "3.63%",
              left: "65.28%"
        },
        card: {
              top: 175,
              height: 128,
              overflow: "hidden"
        },
        topCompany1: {
              marginLeft: -193,
              textAlign: "left",
              fontSize: 16,
              left: "50%",
              marginTop: -9.5
        },
        seeAll: {
              marginTop: -6.5,
              marginLeft: 148,
              textAlign: "right",
              color: "#252828"
        },
        title: {
              left: 0,
              top: 0
        },
        rectangle3: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        logo: {
              height: "54.1%",
              width: "70.21%",
              top: "11.48%",
              right: "14.89%",
              bottom: "34.43%",
              left: "14.89%",
              position: "absolute"
        },
        wendy: {
              marginLeft: -22,
              color: "#96a2a3"
        },
        card1: {
              left: 0
        },
        rectangle4: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        camelia: {
              marginLeft: -27,
              color: "#96a2a3"
        },
        card2: {
              left: 108
        },
        rectangle5: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        jordan: {
              marginLeft: -23,
              color: "#96a2a3"
        },
        card3: {
              left: 216
        },
        rectangle6: {
              top: "0%",
              height: "100%",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: "100%"
        },
        brian: {
              marginLeft: -17,
              color: "#96a2a3"
        },
        card4: {
              left: 324
        },
        topCompany: {
              top: 333,
              width: 418,
              height: 161,
              left: 14,
              position: "absolute"
        },
        rectangle7: {
              left: 0,
              top: 0,
              shadowOpacity: 1,
              elevation: 48,
              shadowRadius: 48,
              shadowOffset: {
                    width: 0,
                    height: 2
              },
              shadowColor: "rgba(0, 0, 0, 0.04)",
              backgroundColor: "#fff",
              borderRadius: 12
        },
        mask5: {
              left: 0,
              top: 0,
              backgroundColor: "#e8ebf1",
              borderRadius: 12
        },
        image1: {
              top: 14,
              left: 14
        },
        fireSyrup: {
              marginLeft: -39.5
        },
        text1: {
              marginLeft: -32.5,
              fontSize: 18,
              marginTop: 1.5,
              color: "#1b3c74",
              textAlign: "center",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        text: {
              left: 36,
              width: 79
        },
        card5: {
              top: 39,
              left: 0
        },
        rectangle8: {
              left: 0,
              top: 0,
              shadowOpacity: 1,
              elevation: 48,
              shadowRadius: 48,
              shadowOffset: {
                    width: 0,
                    height: 2
              },
              shadowColor: "rgba(0, 0, 0, 0.04)",
              backgroundColor: "#fff",
              borderRadius: 12
        },
        multiVitamin: {
              marginLeft: -50
        },
        text3: {
              marginLeft: -32,
              fontSize: 18,
              marginTop: 1.5,
              color: "#1b3c74",
              textAlign: "center",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        text2: {
              left: 24,
              width: 102
        },
        card6: {
              left: 164,
              top: 39
        },

        card7: {
   
            top: 39,
            width:800,
            height:1000,
      },

        cardLayout: {
            height:'100%',
            width: '100%',
          
      },

        painkiller: {
              marginLeft: -35
        },
        text4: {
              left: 39,
              width: 72
        },
      
        popularProducts: {
              top: 524,
              width: 478,
              height: 226,
              left: 14,
              position: "absolute"
        },
        rectangle10: {
              top: 0,
              shadowOpacity: 1,
              elevation: 48,
              shadowRadius: 48,
              shadowOffset: {
                    width: 0,
                    height: 2
              },
              shadowColor: "rgba(0, 0, 0, 0.04)",
              backgroundColor: "#fff",
              borderRadius: 12
        },
        mask8: {
              left: 0,
              top: 0,
              backgroundColor: "#e8ebf1",
              borderRadius: 12
        },
        image4: {
              top: 14,
              left: 14
        },
        flamingoPharmacy: {
              marginTop: -30,
              fontWeight: "500",
              color: "#252828",
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              top: "50%",
              position: "absolute",
              fontSize: 14,
              left: "50%"
        },
        icon3: {
              right: "33.61%",
              left: "55.74%"
        },
        icon4: {
              right: "47.54%",
              left: "41.8%"
        },
        icon5: {
              right: "61.48%",
              left: "27.87%"
        },
        icon6: {
              right: "75.41%",
              left: "13.93%"
        },
        icon7: {
              right: "89.34%",
              left: "0%"
        },
        text6: {
              marginLeft: 24,
              marginTop: -7,
              fontSize: 12,
              textAlign: "left",
              color: "#d6d9da"
        },
        score: {
              height: "23.33%",
              width: "34.08%",
              top: "1.67%",
              bottom: "75%",
              left: "65.92%"
        },
        xxxXxxx: {
              marginLeft: -179,
              textAlign: "left",
              color: "#96a2a3"
        },
        opened247: {
              marginLeft: 94,
              color: "#1b3c74",
              fontWeight: "500",
              textAlign: "right"
        },
        thNewYork: {
              marginTop: 16,
              color: "#96a2a3",
              fontSize: 12,
              //fontFamily: "SF Pro Text",
              letterSpacing: 1,
              left: "50%",
              top: "50%",
              position: "absolute"
        },
        info: {
              top: 216,
              height: 60,
              width: 358,
              left: 14,
              position: "absolute",
              overflow: "hidden"
        },
        card8: {
              top: 39
        },
        allMedicineStore: {
              top: 780,
              height: 329
        },
        view: {
              backgroundColor: "#fafafa",
              flex: 1,
              height: 896,
              overflow: "hidden",
              width: "100%"
        }
  });
  
  // export default Frame;