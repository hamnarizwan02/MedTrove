import * as React from "react";
import { Image,Text,View, TextInput, Button,TouchableOpacity,ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import CONFIG from './config';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ProfileManagement from './profilemangement';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';


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
			//console.log('Found medicine:', medicine);

			// Check if the medicine is an object and contains the _id
			if (typeof medicine === 'object' && medicine !== null && medicine._id) {
				//console.log(medicine._id);
				this.props.navigation.navigate('ProductList', { id: medicine._id });
			} else {
				console.error('Medicine ID not found in response:', medicine);
			}
		} catch (error) {
			console.error('Error fetching medicine:', error);
		}
	};


     fetchMedicine = async(medicine)=> {
            try {
              const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${medicine}`);
              const medicine = response.data; // Medicine object from API response
              //console.log('Found medicine:', medicine);
          
              // Check if the medicine is an object and contains the _id
              if (typeof medicine === 'object' && medicine !== null && medicine._id) {
                //console.log(medicine._id);
                this.props.navigation.navigate('MedInfo', { id: medicine._id });
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


// This section represents top part of the search page 1/3----------------------------------------------------------------
           // <ScrollView style={styles.view}>
    		<ScrollView style={styles.view}>
      		
                  <View style={[styles.header, styles.titleLayout]}>
            
                              <Text style={[styles.home, styles.homePosition]}>Home</Text>
                            
                            {/* This navigates to the profile page from the profile icon */}
                               <View style={styles.iconContainer}>
                               <TouchableOpacity onPress={() => this.props.navigation.navigate(ProfileManagement)}>
                                   
                                          <Ionicons name="person" size={25} color="#064D65" />
                                    </TouchableOpacity>
                              </View>
                              
                            

                        
                             
                  </View>

{/* //  The search code is below */}
		<View style={styles.search}>
			  <TextInput
          		placeholder="Search..."
          		onChangeText={(text) => {
            	this.setState({ searchText: text });
           	 	 console.log('Search text updated:', text); // Print the updated search text
          }}
          onSubmitEditing={this.handleSearchSubmit}


		></TextInput>

            <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                  <Ionicons name="search" size={32} color="#064D65" style={{ textAlign: 'right' }} />
            </View>

            {/* <Ionicons name="search" size={30} color="#064D65" /> */}
{/* ---------------------------------------------------------------- */}
{/* ---------------------------------------------------------------- */}


          </View>

{/* // This section represents the big midddle service */}
      			<View style={[styles.card, styles.cardPosition]}>

        				<View style={[styles.rectangle1, styles.rectangleShadowBox]} />
        				<Text style={[styles.weWillDeliver, styles.topCompany1Typo]}>We will safely deliver your medications</Text>
        				<View style={[styles.button, styles.imagePosition1]}>
          					<View style={[styles.rectangle2, styles.rectanglePosition]} />
          					<Text style={[styles.orderNow, styles.text6Position]}>Order Now</Text>
        				</View>
        				<View style={[styles.image, styles.imagePosition1]}>
                                <Image source={require('./assets/home.jpeg')} style={[styles.imageCard1]} resizeMode="cover" />
        				</View>
      			</View>
      			
{/*-------------Add a scroll view---------------------	 */}
{/*-------------MAIN SERVICES--------------------	 */}
                        <View style={styles.topCompany}>
        				
          					<Text style={[styles.serviceText]}>Services</Text>
        			

                               {/* Donation Button*/}
                               <View style={[styles.card1]}>
                               <Ionicons name="chevron-back" size={30} color="#064D65" />
                               </View>
                               
                               <View style={[ styles.cardLayout1]}>
          					<View style={[styles.rectangle3,styles.imageCard]} />

                                        <View style={styles.serviceContainer}>
                                                <Image source={require('./assets/medibot.jpeg')} style={styles.serviceicon} resizeMode="contain" />
                                           </View>
          					{/* <Text style={[styles.wendy, styles.wendyPosition]}>Donations</Text> */}
        				</View>
                               {/* Chatbot Button */}
        				<View style={[styles.card2, styles.cardLayout1]}>
          					<View style={[styles.rectangle4, styles.imageCard]} />
                                    
                                        <View style={styles.serviceContainer}>
                                           <Image source={require('./assets/DDI.jpeg')} style={[styles.serviceicon2]} resizeMode="contain" /> 
                                        </View>

          					{/* <Text style={[styles.camelia, styles.wendyPosition]}>{`Medibot `}</Text> */}
        				</View>

                                  {/* ADD DDI IMAGE HERE HAMNA OK ALIZA */}
        				<View style={[styles.card3, styles.cardLayout1]}>
          					<View style={[styles.rectangle5, styles.imageCard]} />
                              
                                        <View style={styles.serviceContainer}>
                                        <Image source={require('./assets/reminder.jpeg')} style={[styles.serviceicon3]} resizeMode="contain" /> 
                                        </View>
                                       

          					{/* <Text style={[styles.jordan, styles.wendyPosition1]}>DDI</Text> */}
        				</View> 
      

                                <View style={[styles.frontArrow]}>
                               <Ionicons name="chevron-forward" size={30} color="#064D65" />
                               </View> 
       


      			</View>
			{/IMAGE SLIDESHOW FOR MEDICATION/}

            <View style={[styles.medicineRecCard]}>
                  
                  <Text style={[styles.RecommendedText]}>Recommended for You</Text>

                  <View style={[styles.medslideshowCard]}>
                        <View style={[styles.medicineCard]}>
                        <TouchableOpacity  onPress={() =>this.props.navigation.navigate('MedInfo', { name :"panadol" })}>
                        <Image source={require('./assets/panadol.jpeg')} style={[styles.imageFit]} resizeMode="contain"/> 
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.medicineCard]}>
                        <TouchableOpacity  onPress={() =>this.props.navigation.navigate('MedInfo', { name :"flagyl" })}>
                        <Image source={require('./assets/flagyl.jpeg')} style={[styles.imageFit]} resizeMode="contain" />    
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.medicineCard]}>
                        <TouchableOpacity  onPress={() =>this.props.navigation.navigate('MedInfo', { name :"benadryl" })}>
                        <Image source={require('./assets/benad.jpeg')} style={[styles.imageFit]} resizeMode="contain" />   
                        </TouchableOpacity>
                        </View>
                  </View>
   
            </View>

            <View style={styles.pharmacon}>
                    <Text style={[styles.pharmaText]}>Pharmacy Locator</Text>
                    <Image source={require('./assets/pharma.png')} style={styles.mapImage} resizeMode="contain" />
            </View>

    		</ScrollView>
            //</ScrollView>
        );
    }
}

const styles = StyleSheet.create({
      pharmacon: {
            marginTop: 780,
      },
      pharmaText :{
            fontWeight: "500",
            color: "#252828",
            letterSpacing: 1,
            marginLeft: -186,
            textAlign: "left",
            left: "53%",
            fontSize: 20,
      },
      mapImage: {
            width: '75%',
            height: 200, // Adjust height as needed
            Top: 0,
            marginLeft: 50,
            borderRadius: 25 // Add this line
      },
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



// Title Page styles
      icon: {
            width:"100%",
            height: "100%",
            right: "94.3%",
            left: "0%",
            bottom: "0%",
            top: "10.26%",
            maxHeight: "100%",
            maxWidth: "100%",
            overflow: "hidden"
      },
      
      iconContainer:{   //holds notification icon
            width:"100%",
            height: "100%",
            alignContent:"right",
            position: "absolute",
            alignItems: "flex-end",
            

      },
      home: { //home text styles
            marginLeft: -25,
            fontWeight: "600",
            textAlign: "center",
            color: "#252828",
            fontSize: 16,
            left: "50%",
            marginTop: -9.5
      },

      homePosition: { //text for home text
            //fontFamily: "Arial",
            letterSpacing: 1,
            top: "50%",
            left:30,
            position: "absolute",
            alignContent:"left",
      },
      titleLayout: {
            height: 25,
            width: 386,
            position: "absolute",
            overflow: "hidden",
        
      },
      
//----------------------------------------------------------------
// SEARCH STYLES

      // searchCard: {
      //       backgroundColor: "#fff",
      //       borderRadius: 12,
      //       shadowOpacity: 0.1,
      //       shadowOffset: { width: 0, height: 2 },
      //       shadowRadius: 5,
      //       elevation: 5, // Android shadow
      //       padding: 10, // Adds padding inside the card
      //       // Space below the search card
      // },

      search: {
            flexDirection: "row", // Align the icon and text horizontally
            alignItems: "center", // Center items vertically
            backgroundColor: "#f1f1f1", // Background for the search bar
            borderRadius: 10,
            top:100,
            left:60,
            paddingHorizontal: 10, // Horizontal padding for space inside
            height: 40, // Height of the search bar
            width: 300, // Width of the search bar
            borderWidth:0.5,
            borderColor:"#064D65",
      },

      searchText: {
            fontSize: 16, // Font size for search text
            color: "#999", // Light color for placeholder text
      },
//----------------------------------------------------------------
// SERVICES


      cardPosition: { // the card which holds the order now info  
            width: 386,
             position: "relative",
            left: 14,
            height:200,
            position: "absolute",
            borderRadius:25,
            backgroundColor: "#e0eff6", //this is a light blue colour
         
         
      },

      card: { // the card which holds the order now stuff
            top: 180,
            height: 128,
            overflow: "hidden",
            shadowOpacity: 1,
            elevation: 60,
            shadowRadius: 48,
            shadowOffset: {
                  width: 0,
                  height: 3
            },
            shadowColor: "rgba(0, 0, 0, 0.8)",
            borderColor:"#064D65",
            borderWidth:0.5,
            
           

         
      },
      
      rectangleShadowBox: {
          
          
            backgroundColor: "transparent",
            borderRadius: 12
      },

      
      orderNow: { // button
            marginLeft: -44,
            textTransform: "uppercase",
            fontWeight: "700",
            color: "#fff",
            marginTop: -10,
            fontSize: 12,
            textAlign: "center",

      },

      //the images for order now
      imagePosition1: {
            bottom: "10.94%",
            position: "absolute"
      },

      image: {
            height: "100",
            width: "90%",
            top: "10.94%",
            right: "5.63%",
            left: "65.28%"
      },

      imageCard1:{          //image container
                  top: "0%",
              height: "100",
              right: "0%",
              left: "0%",
              bottom: "0%",
              position: "absolute",
              width: 140,
              marginLeft: -10
        },
       

      //---------------------------------------------------------------

        
      topCompany1Typo: {
            fontWeight: "500",
            color: "#252828",
            //fontFamily: "SF Pro Text",
            letterSpacing: 1,
            top: "50%",
            position: "absolute"
      },
      topCompany1: {
            marginLeft: -193,
            textAlign: "left",
            fontSize: 20,
            left: "50%",
            marginTop: -15,
      },


      //---------------------------------------------------------------
      //MAIN SERVICES //

      card1: { //back arrow
            left: 0,
            top: "40%",
            shadowOpacity: 1,

            
      },

      frontArrow:{

            right: "8%",
            top: "60%",
            shadowOpacity: 1,
            alignContent: "right",
            position:"absolute",
      },
   
      cardLayout1: {
            height: "100%",
            width: "100%",
            top: "50%",
            position: "absolute",
            shadowOpacity:1,

           

      },
      rectangle3: { // no use i think of this
            top: "30%",
            height: "100%",
            right: "0%",
            left: "0%",
            bottom: "0%",
            position: "absolute",
            width: "100%",
            
            
           
      },

      imageCard:{
              top: "10%",
              height: "60%",
              right: "0%",
              left: "10%",
              bottom: "0%",
             // position: "absolute",
              width: "22%",
              marginLeft: 0,
              backgroundColor: "#e0eff6",
              borderRadius: 50,


        },

        serviceContainer: {
            width: '60%', // adjust this value to change the image size
            height: '70%',
            left:"11.5%",
            top: "18%", // adjust this value to change the image size
          
          },
          
          serviceicon: {
            top:6,
            left:2,
            width: '30%',
            height: '50%',
            backgroundColor: "#e0eff6",
            borderRadius:10
           
          },

          serviceicon2: {
            width: '25%',
            height: '50%',
            backgroundColor: "#e0eff6",
            left:"6%",
            top: "5%",
          },

          serviceicon3: {
            width: '30%',
            height: '50%',
            backgroundColor: "#e0eff6",
            left:"3.2%",
            top: "5%",
            borderRadius:22
          },


      serviceText:{
            fontWeight: "500",
            color: "#252828",
            //fontFamily: "SF Pro Text",
            letterSpacing: 1,
            top: "12%",
            marginLeft: -193,
            textAlign: "left",
            fontSize: 20,
            left: "50%",
        
            },


          topCompany: {
            top: "45%",
            width: 418,
            height: 161,
            left: 14,
            position: "absolute",
            marginTop: -75
           
      },
      //--------------------------------------------------------------
      // IMAGE SLIDESHOW FOR MEDICATION


      medicineRecCard:{ //contains recommended medications

            top: "67%",
            width: "95%",
            height: "30%",
            //left: "2%",
            position: "absolute",
            marginTop: -120,
            marginLeft: 15

      },


      medslideshowCard:{

            top: "5%",
            width: "100%",
            height: "90%",
            //left: "0.5%",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
         

      },
      RecommendedText:{
            fontWeight: "500",
            color: "#252828",
            letterSpacing: 1,
            marginLeft: -193,
            textAlign: "left",
            left: "53%",
            fontSize: 20,
            },


      medicineCard:{

              top: "5%",
              height: "62%",
             // position: "absolute",
              width: "33%",
              marginLeft: 12,
              borderRadius: 15,
              backgroundColor: "white",
             
      },
      imageFit: {
            width: '110%',
            height: '100%',   
          },

      //-----------------------------------------------------------------
      cardLayout1: {
            height: "100%",
            width: "100%",
            top: "30%",
            position: "absolute",
            shadowOpacity:1,

      },
    
     
       
        text6Clr: {
              color: "#d6d9da",
              textAlign: "left"
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
       
        wendyPosition: {
              marginTop: 40,    rectangle3: {
                  top: "0%",
                  height: "100%",
                  right: "0%",
                  left: "0%",
                  bottom: "0%",
                  position: "absolute",
                  width: "100%"
            },
              marginLeft: -30,
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
        wendyPosition1: {     //DDI text
            marginTop: 40,
            marginLeft: -20,
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
              width: "60.82%",
              lineHeight: 22,
              textAlign: "left",
              left: "3.63%",
              fontSize: 15.5,
        },
        rectangle2: {
              borderRadius: 21,
              backgroundColor: "#1b3c74"

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
            width: '80%',
            marginLeft: 4

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