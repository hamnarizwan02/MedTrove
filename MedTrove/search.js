import * as React from "react";
import {Image, StyleSheet, TextInput, Text, View} from "react-native";
//import { Keyboard } from 'react-native';

export default class Search extends React.Component {
	// handleSearchSubmit = () => {
	// 	Keyboard.dismiss();
    
	// 	// Navigate to ProductList page when search is completed
	// 	 this.props.navigation.navigate('ProductList');
	// };

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
					style={styles.input}
					returnKeyType="search"
					//placeholder="Search"
					//onSubmitEditing={this.handleSearchSubmit} // Trigger navigation on Enter
				/>
				<Image style={[styles.icon2, styles.iconLayout1]} resizeMode="cover" source="icon.png" />
				<Text style={styles.searchText}>Search</Text>
       
          </View>
      			<View style={[styles.card, styles.cardPosition]}>
        				<View style={[styles.rectangle1, styles.rectangleShadowBox]} />
        				<Text style={[styles.weWillDeliver, styles.topCompany1Typo]}>We will deliver your medicines safely</Text>
        				<View style={[styles.button, styles.imagePosition1]}>
          					<View style={[styles.rectangle2, styles.rectanglePosition]} />
          					<Text style={[styles.orderNow, styles.text6Position]}>Order Now</Text>
        				</View>
        				<View style={[styles.image, styles.imagePosition1]}>
          					<View style={[styles.mask, styles.maskBg]} />
        				</View>
      			</View>
      			<View style={styles.topCompany}>
        				<View style={[styles.title, styles.titleLayout]}>
          					<Text style={[styles.topCompany1, styles.topCompany1Typo]}>Top Company</Text>
          					<Text style={[styles.seeAll, styles.text6Position]}>See All</Text>
        				</View>
        				<View style={[styles.card1, styles.cardLayout1]}>
          					<View style={[styles.rectangle3, styles.rectangleShadowBox]} />
          					<View style={styles.logo}>
            						<View style={[styles.mask, styles.maskBg]} />
          					</View>
          					<Text style={[styles.wendy, styles.wendyPosition]}>Wendy</Text>
        				</View>
        				<View style={[styles.card2, styles.cardLayout1]}>
          					<View style={[styles.rectangle4, styles.rectangleShadowBox]} />
          					<View style={styles.logo}>
            						<View style={[styles.mask, styles.maskBg]} />
          					</View>
          					<Text style={[styles.camelia, styles.wendyPosition]}>{`Camelia `}</Text>
        				</View>
        				<View style={[styles.card3, styles.cardLayout1]}>
          					<View style={[styles.rectangle5, styles.rectangleShadowBox]} />
          					<View style={styles.logo}>
            						<View style={[styles.mask, styles.maskBg]} />
          					</View>
          					<Text style={[styles.jordan, styles.wendyPosition]}>Jordan</Text>
        				</View>
        				<View style={[styles.card4, styles.cardLayout1]}>
          					<View style={[styles.rectangle6, styles.rectangleShadowBox]} />
          					<View style={styles.logo}>
            						<View style={[styles.mask, styles.maskBg]} />
          					</View>
          					<Text style={[styles.brian, styles.wendyPosition]}>Brian</Text>
        				</View>
      			</View>
      			<View style={styles.popularProducts}>
        				<View style={[styles.title, styles.titleLayout]}>
          					<Text style={[styles.topCompany1, styles.topCompany1Typo]}>Popular Products</Text>
          					<Text style={[styles.seeAll, styles.text6Position]}>See All</Text>
        				</View>
        				<View style={[styles.card5, styles.cardLayout]}>
          					<View style={[styles.rectangle7, styles.cardLayout]} />
          					<View style={[styles.image1, styles.mask5Layout]}>
            						<View style={[styles.mask5, styles.mask5Layout]} />
          					</View>
          					<View style={[styles.text, styles.textPosition1]}>
            						<Text style={[styles.fireSyrup, styles.fireSyrupPosition]}>Fire Syrup</Text>
            						<Text style={[styles.text1, styles.textClr]}>$12.50</Text>
          					</View>
        				</View>
        				<View style={[styles.card6, styles.cardLayout]}>
          					<View style={[styles.rectangle8, styles.cardLayout]} />
          					<View style={[styles.image1, styles.mask5Layout]}>
            						<View style={[styles.mask5, styles.mask5Layout]} />
          					</View>
          					<View style={[styles.text2, styles.textPosition1]}>
            						<Text style={[styles.multiVitamin, styles.fireSyrupPosition]}>Multi Vitamin</Text>
            						<Text style={[styles.text3, styles.textClr]}>$10.45</Text>
          					</View>
        				</View>
        				<View style={[styles.card7, styles.cardLayout]}>
          					<View style={[styles.rectangle9, styles.cardLayout]} />
          					<View style={[styles.image1, styles.mask5Layout]}>
            						<View style={[styles.mask5, styles.mask5Layout]} />
          					</View>
          					<View style={[styles.text4, styles.textPosition1]}>
            						<Text style={[styles.painkiller, styles.fireSyrupPosition]}>Painkiller</Text>
            						<Text style={[styles.text3, styles.textClr]}>$21.98</Text>
          					</View>
        				</View>
      			</View>
      			<View style={[styles.allMedicineStore, styles.cardPosition]}>
        				<View style={[styles.title, styles.titleLayout]}>
          					<Text style={[styles.topCompany1, styles.topCompany1Typo]}>All Medicine Store</Text>
          					<Text style={[styles.seeAll, styles.text6Position]}>See All</Text>
        				</View>
        				<View style={[styles.card8, styles.card8Layout]}>
          					<View style={[styles.rectangle10, styles.card8Layout]} />
          					<View style={[styles.image4, styles.mask8Layout]}>
            						<View style={[styles.mask8, styles.mask8Layout]} />
          					</View>
          					<View style={styles.info}>
            						<Text style={[styles.flamingoPharmacy, styles.xxxXxxxSpaceBlock]}>Flamingo Pharmacy</Text>
            						<View style={[styles.score, styles.icon1Position]}>
              							<Image style={[styles.icon3, styles.iconLayout]} resizeMode="cover" source="icon.png" />
              							<Image style={[styles.icon4, styles.iconLayout]} resizeMode="cover" source="icon.png" />
              							<Image style={[styles.icon5, styles.iconLayout]} resizeMode="cover" source="icon.png" />
              							<Image style={[styles.icon6, styles.iconLayout]} resizeMode="cover" source="icon.png" />
              							<Image style={[styles.icon7, styles.iconLayout]} resizeMode="cover" source="icon.png" />
              							<Text style={[styles.text6, styles.text6Position]}>(435)</Text>
            						</View>
            						<Text style={[styles.xxxXxxx, styles.xxxXxxxPosition]}>+1 408 XXX XXXX</Text>
            						<Text style={[styles.opened247, styles.xxxXxxxPosition]}>Opened 24/7</Text>
            						<Text style={[styles.thNewYork, styles.xxxXxxxSpaceBlock]}>221 TH New York NY 3837-3626 USA</Text>
          					</View>
        				</View>
      			</View>
    		</View>
        );
    }
}

const styles = StyleSheet.create({
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
    		backgroundColor: "#fff",
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
  	cardLayout: {
    		height: 187,
    		width: 150,
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
  	rectangle9: {
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
  	painkiller: {
    		marginLeft: -35
  	},
  	text4: {
    		left: 39,
    		width: 72
  	},
  	card7: {
    		left: 328,
    		top: 39
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