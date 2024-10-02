import * as React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

export default class ProductList extends React.Component {

    render(){
  	
  	return (
    		<View style={styles.view}>
      			<View style={[styles.header, styles.headerPosition]}>
        				<Image style={styles.icon} resizeMode="cover" source="Icon.png" />
        				<Text style={styles.orderList}>Search Results</Text>
        				<Image style={styles.icon1} resizeMode="cover" source="Icon.png" />
      			</View>

            <View style={styles.search}>
      
                <Text style={styles.searchText}>Search</Text>
       
          </View>

      			<View style={[styles.section, styles.headerPosition]}>
        				<View style={[styles.card, styles.cardLayout]}>
          					<View style={[styles.rectangle, styles.rectangleShadowBox]} />
          					<View style={[styles.image, styles.maskLayout]}>
            						<View style={[styles.mask, styles.maskLayout]} />
          					</View>
          					<View style={styles.info}>
            						<View style={[styles.text, styles.textPosition1]}>
              							<Text style={[styles.vitaminSyrup, styles.mlPosition]}>Vitamin Syrup</Text>
              							<Text style={[styles.ml, styles.unitsClr]}>350 ml</Text>
            						</View>
            						<Text style={[styles.text1, styles.textTypo]}>$34.09</Text>
            						<View style={[styles.add, styles.addPosition]}>
              							<Image style={[styles.icon2, styles.iconLayout1]} resizeMode="cover" source="Icon.png" />
              							<Text style={styles.text2}>1</Text>
              							<Image style={[styles.icon3, styles.iconLayout1]} resizeMode="cover" source="Icon.png" />
            						</View>
          					</View>
        				</View>
        				<View style={[styles.card1, styles.cardLayout]}>
          					<View style={[styles.rectangle1, styles.rectangleShadowBox]} />
          					<View style={[styles.image, styles.maskLayout]}>
            						<View style={[styles.mask, styles.maskLayout]} />
          					</View>
          					<View style={styles.info}>
            						<View style={[styles.text3, styles.textPosition1]}>
              							<Text style={[styles.stomachMedicine, styles.unitsPosition]}>Stomach Medicine</Text>
              							<Text style={[styles.units, styles.unitsPosition]}>30 units</Text>
            						</View>
            						<Text style={[styles.text1, styles.textTypo]}>$22.43</Text>
            						<View style={[styles.add1, styles.addPosition]}>
              							<Image style={[styles.icon4, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
              							<Text style={[styles.text5, styles.textPosition]}>2</Text>
              							<Image style={[styles.icon5, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
            						</View>
          					</View>
        				</View>
        				<View style={[styles.card2, styles.cardLayout]}>
          					<View style={[styles.rectangle2, styles.rectangleShadowBox]} />
          					<View style={[styles.image, styles.maskLayout]}>
            						<View style={[styles.mask, styles.maskLayout]} />
          					</View>
          					<View style={styles.info}>
            						<View style={[styles.text6, styles.textPosition1]}>
              							<Text style={[styles.stomachSyrup, styles.ml1Position]}>Stomach Syrup</Text>
              							<Text style={[styles.ml1, styles.ml1Position]}>240 ml</Text>
            						</View>
            						<Text style={[styles.text1, styles.textTypo]}>$55.00</Text>
            						<View style={[styles.add, styles.addPosition]}>
              							<Image style={[styles.icon2, styles.iconLayout1]} resizeMode="cover" source="Icon.png" />
              							<Text style={[styles.text8, styles.textPosition]}>1</Text>
              							<Image style={[styles.icon3, styles.iconLayout1]} resizeMode="cover" source="Icon.png" />
            						</View>
          					</View>
        				</View>
        				<View style={[styles.card3, styles.cardLayout]}>
          					<View style={[styles.rectangle3, styles.rectangleShadowBox]} />
          					<View style={[styles.image, styles.maskLayout]}>
            						<View style={[styles.mask, styles.maskLayout]} />
          					</View>
          					<View style={styles.info}>
            						<View style={[styles.text9, styles.textPosition1]}>
              							<Text style={[styles.heartMedications, styles.units1Position]}>Heart Medications</Text>
              							<Text style={[styles.units1, styles.units1Position]}>15 units</Text>
            						</View>
            						<Text style={[styles.text10, styles.textTypo]}>$25.50</Text>
            						<View style={[styles.add1, styles.addPosition]}>
              							<Image style={[styles.icon4, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
              							<Text style={[styles.text5, styles.textPosition]}>2</Text>
              							<Image style={[styles.icon5, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
            						</View>
          					</View>
        				</View>
        				<View style={[styles.card4, styles.cardLayout]}>
          					<View style={[styles.rectangle4, styles.rectangleShadowBox]} />
          					<View style={[styles.image, styles.maskLayout]}>
            						<View style={[styles.mask, styles.maskLayout]} />
          					</View>
          					<View style={styles.info}>
            						<View style={[styles.text12, styles.textPosition1]}>
              							<Text style={[styles.multiVitamin, styles.mlgPosition]}>Multi Vitamin</Text>
              							<Text style={[styles.mlg, styles.mlgPosition]}>120 mlg</Text>
            						</View>
            						<Text style={[styles.text13, styles.textTypo]}>$300.00</Text>
            						<View style={[styles.add1, styles.addPosition]}>
              							<Image style={[styles.icon4, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
              							<Text style={[styles.text5, styles.textPosition]}>3</Text>
              							<Image style={[styles.icon5, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
            						</View>
          					</View>
        				</View>
      			</View>
      	
    		</View>);
    }
};

const styles = StyleSheet.create({
  	headerPosition: {
    		width: 386,
    		left: 14,
        padding:10,
    
  	},

  	cardLayout: {
    		height: 132,
    		left: 0,
    		width: 386,
    		position: "absolute"
  	},

    search: {
  
      flexDirection: "row", // Align the icon and text horizontally
      alignItems: "center", // Center items vertically
      backgroundColor: "#f1f1f1", // Background for the search bar
      borderRadius: 10,
      top:60,
      left:60,
      paddingHorizontal: 10, // Horizontal padding for space inside
      height: 40, // Height of the search bar
      width: 300, // Width of the search bar
  },

    searchText: {
    fontSize: 16, // Font size for search text
    color: "black", // Light color for placeholder text
  },

  	rectangleShadowBox: {
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
        padding:10,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		top: 0
  	},
  	maskLayout: {
    		height: 104,
    		width: 120,
    		position: "absolute"
  	},
  	textPosition1: {
    		bottom: "50%",
    		height: "50%",
    		top: "0%",
    		left: "0%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	mlPosition: {
    		textAlign: "left",
    		marginLeft: -54,
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	unitsClr: {
    		color: "#96a2a3",
    		fontSize: 12
  	},
  	textTypo: {
    		textAlign: "right",
    		color: "#1b3c74",
    		marginTop: 13,
    		fontSize: 18,
    		fontWeight: "500",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	addPosition: {
    		top: "60.53%",
    		height: "39.47%",
    		left: "0%",
    		bottom: "0%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	iconLayout1: {
    		width: "30.61%",
    		height: "100%",
    		top: "0%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		bottom: "0%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	unitsPosition: {
    		marginLeft: -70.5,
    		textAlign: "left",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	iconLayout: {
    		width: "29.7%",
    		height: "100%",
    		top: "0%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		bottom: "0%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	textPosition: {
    		marginTop: -11,
    		fontSize: 18,
    		fontWeight: "500",
    		textAlign: "center",
    		color: "#252828",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	ml1Position: {
    		marginLeft: -58.5,
    		textAlign: "left",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	units1Position: {
    		marginLeft: -71,
    		textAlign: "left",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	mlgPosition: {
    		marginLeft: -51,
    		textAlign: "left",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	section1Layout: {
    		height: 108,
    		width: 414,
    		left: 0,
    		position: "absolute"
  	},
  	text15Position: {
    		height: 48,
    		top: 30,
    		position: "absolute",
    		overflow: "hidden"
  	},
  	text16Position: {
    		marginLeft: -49,
    		textAlign: "left",
    		fontWeight: "500",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	icon: {
    		width: "4.66%",
    		top: "5.26%",
    		right: "95.34%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		bottom: "0%",
    		height: "94.74%",
    		left: "0%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	orderList: {
    		marginTop: -9.5,
    		marginLeft: -44,
    		fontSize: 16,
    		fontWeight: "600",
    		textAlign: "center",
    		color: "#252828",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: 10,
    		position: "absolute"
  	},
  	icon1: {
    		width: "0.52%",
    		bottom: "5.26%",
    		left: "99.48%",
    		right: "0%",
    		top: "0%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		height: "94.74%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	header: {
    		top: 48,
    		height: 19,
    		overflow: "hidden"
  	},
  	rectangle: {
    		borderRadius: 12,
    		left: 0,
    		shadowColor: "rgba(0, 0, 0, 0.04)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		height: 132,
    		width: 386,
    		position: "absolute"
  	},
  	mask: {
    		backgroundColor: "#e8ebf1",
    		borderRadius: 12,
    		left: 0,
    		top: 0
  	},
  	image: {
    		top: 14,
    		left: 14
  	},
  	vitaminSyrup: {
    		fontWeight: "500",
    		fontSize: 14,
    		marginTop: -19,
    		color: "#252828"
  	},
  	ml: {
    		marginTop: 5,
    		color: "#96a2a3",
    		textAlign: "left",
    		marginLeft: -54,
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	text: {
    		width: "48.21%",
    		right: "51.79%"
  	},
  	text1: {
    		marginLeft: 44
  	},
  	icon2: {
    		right: "69.39%",
    		left: "0%"
  	},
  	text2: {
    		marginTop: -10,
    		marginLeft: -4,
    		fontSize: 18,
    		fontWeight: "500",
    		textAlign: "center",
    		color: "#252828",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	icon3: {
    		left: "69.39%",
    		right: "0%"
  	},
  	add: {
    		width: "43.75%",
    		right: "56.25%"
  	},
  	info: {
    		top: 28,
    		left: 148,
    		width: 224,
    		height: 76,
    		position: "absolute",
    		overflow: "hidden"
  	},
  	card: {
    		top: 0
  	},
  	rectangle1: {
    		borderRadius: 12,
    		left: 0,
    		shadowColor: "rgba(0, 0, 0, 0.04)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		height: 132,
    		width: 386,
    		position: "absolute"
  	},
  	stomachMedicine: {
    		fontWeight: "500",
    		fontSize: 14,
    		marginTop: -19,
    		color: "#252828"
  	},
  	units: {
    		color: "#96a2a3",
    		fontSize: 12,
    		marginTop: 5
  	},
  	text3: {
    		width: "62.95%",
    		right: "37.05%"
  	},
  	icon4: {
    		right: "70.3%",
    		left: "0%"
  	},
  	text5: {
    		marginLeft: -6.5
  	},
  	icon5: {
    		left: "70.3%",
    		right: "0%"
  	},
  	add1: {
    		width: "45.09%",
    		right: "54.91%"
  	},
  	card1: {
    		top: 146
  	},
  	rectangle2: {
    		borderRadius: 12,
    		left: 0,
    		shadowColor: "rgba(0, 0, 0, 0.04)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		height: 132,
    		width: 386,
    		position: "absolute"
  	},
  	stomachSyrup: {
    		fontWeight: "500",
    		fontSize: 14,
    		marginTop: -19,
    		color: "#252828"
  	},
  	ml1: {
    		color: "#96a2a3",
    		fontSize: 12,
    		marginTop: 5
  	},
  	text6: {
    		width: "52.23%",
    		right: "47.77%"
  	},
  	text8: {
    		marginLeft: -4
  	},
  	card2: {
    		top: 292
  	},
  	rectangle3: {
    		borderRadius: 12,
    		left: 0,
    		shadowColor: "rgba(0, 0, 0, 0.04)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		height: 132,
    		width: 386,
    		position: "absolute"
  	},
  	heartMedications: {
    		fontWeight: "500",
    		fontSize: 14,
    		marginTop: -19,
    		color: "#252828"
  	},
  	units1: {
    		color: "#96a2a3",
    		fontSize: 12,
    		marginTop: 5
  	},
  	text9: {
    		width: "63.39%",
    		right: "36.61%"
  	},
  	text10: {
    		marginLeft: 45
  	},
  	card3: {
    		top: 438
  	},
  	rectangle4: {
    		borderRadius: 12,
    		left: 0,
    		shadowColor: "rgba(0, 0, 0, 0.04)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		height: 132,
    		width: 386,
    		position: "absolute"
  	},
  	multiVitamin: {
    		fontWeight: "500",
    		fontSize: 14,
    		marginTop: -19,
    		color: "#252828"
  	},
  	mlg: {
    		color: "#96a2a3",
    		fontSize: 12,
    		marginTop: 5
  	},
  	text12: {
    		width: "45.54%",
    		right: "54.46%"
  	},
  	text13: {
    		marginLeft: 31
  	},
  	card4: {
    		top: 584
  	},
  	section: {
    		top: 97,
    		height: 716
  	},
  	rectangle5: {
    		shadowColor: "rgba(0, 0, 0, 0.12)",
    		backgroundColor: "#fff",
    		shadowOpacity: 1,
    		elevation: 48,
    		shadowRadius: 48,
    		shadowOffset: {
      			width: 0,
      			height: 2
    		},
    		top: 0
  	},
  	totalPrice: {
    		marginTop: -24,
    		color: "#96a2a3",
    		fontSize: 12
  	},
  	text16: {
    		marginTop: -2,
    		fontSize: 22,
    		color: "#5fd3b0"
  	},
  	text15: {
    		width: 98,
    		left: 14
  	},
  	rectangle6: {
    		borderRadius: 24,
    		backgroundColor: "#1b3c74",
    		height: "100%",
    		right: "0%",
    		top: "0%",
    		left: "0%",
    		bottom: "0%",
    		position: "absolute",
    		width: "100%"
  	},
  	orderNow: {
    		marginTop: -7,
    		marginLeft: -42,
    		textTransform: "uppercase",
    		fontWeight: "700",
    		color: "#fff",
    		fontSize: 12,
    		textAlign: "center",
    		//fontFamily: "Arial",
    		letterSpacing: 1,
    		left: "50%",
    		top: "50%",
    		position: "absolute"
  	},
  	button: {
    		left: 126,
    		width: 274
  	},
  	section1: {
    		top: 788
  	},
  	view: {
    		backgroundColor: "#fafafa",
    		flex: 1,
    		height: 896,
    		overflow: "hidden",
    		width: "100%"
  	}
});

//export default Frame;