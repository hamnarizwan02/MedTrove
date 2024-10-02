// import * as React from "react";
// import {Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
// import CONFIG from './config.js'; 

// export default class MedInfo extends React.Component {

// //   	render()
// // 	{
// //   	return (
// //     		<View style={styles.view}>
// //       			<View style={[styles.header, styles.cardPosition]}>
// //         				<Image style={styles.icon} resizeMode="cover" source="Icon.png" />
// //         				<Text style={styles.medicineDetails}>Medicine Details</Text>
// //         				<Image style={styles.icon1} resizeMode="cover" source="Icon.png" />
// //       			</View>
// //       			<View style={[styles.card, styles.cardPosition]}>
// //         				<View style={styles.maskPosition}>
// //           					<View style={[styles.mask, styles.maskPosition]} />
// //         				</View>
// //         				<Image style={[styles.slidersIcon, styles.rectangle1Layout]} resizeMode="cover" source="Sliders.png" />
// //       			</View>
// //       			<View style={[styles.section, styles.sectionLayout]}>
// //         				<View style={[styles.rectangle, styles.sectionLayout]} />
// //         				<View style={[styles.rectangle1, styles.rectangle1Layout]} />
// //         				<View style={[styles.text, styles.textPosition]}>
// //           					<Text style={styles.heartMedications}>Heart Medications</Text>
// //           					<Text style={styles.byQuicheHollandais}>By Quiche Hollandaise</Text>
// //         				</View>
// //         				<View style={[styles.item, styles.cardPosition]}>
// //           					<View style={[styles.add, styles.addPosition]}>
// //             						<Image style={[styles.icon2, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
// //             						<Text style={styles.text1}>2</Text>
// //             						<Image style={[styles.icon3, styles.iconLayout]} resizeMode="cover" source="Icon.png" />
// //           					</View>
// //           					<Text style={[styles.text2, styles.text2Position]}>$10.45</Text>
// //         				</View>
// //         				<View style={[styles.about, styles.cardPosition]}>
// //           					<Text style={[styles.about1, styles.text2Position]}>About</Text>
// //           					<Text style={[styles.donecPosuereTorto, styles.sedTypo]}>Donec posuere, tortor vitae imperdiet mattis, augue lacus semper nibh, ac dictum nunc leo et eros. Duis at sem at elit sodales semper.</Text>
// //           					<Text style={[styles.sedSedDolor, styles.sedTypo]}>Sed sed dolor semper, molestie dolor non, luctus neque. Fusce porttitor imperdiet ligula eget.</Text>
// //         				</View>
// //         				<View style={[styles.button, styles.textPosition]}>
// //           					<View style={[styles.rectangle2, styles.addPosition]} />
// //           					<Text style={styles.addToCart}>Add To Cart</Text>
// //         				</View>
// //       			</View>
// //     		</View>);
// // 	}

// //  };

// // const styles = StyleSheet.create({
// //   	cardPosition: {
// //     		left: 14,
// //     		position: "absolute",
// //     		width: 386
// //   	},
// //   	maskPosition: {
// //     		height: 330,
// //     		left: 0,
// //     		top: 0,
// //     		width: 386,
// //     		position: "absolute"
// //   	},
// //   	rectangle1Layout: {
// //     		height: 5,
// //     		position: "absolute"
// //   	},
// //   	sectionLayout: {
// //     		height: 424,
// //     		width: 414,
// //     		left: 0,
// //     		position: "absolute"
// //   	},
// //   	textPosition: {
// //     		height: 48,
// //     		left: 14,
// //     		position: "absolute",
// //     		overflow: "hidden"
// //   	},
// //   	addPosition: {
// //     		height: "100%",
// //     		right: "0%",
// //     		top: "0%",
// //     		bottom: "0%",
// //     		position: "absolute"
// //   	},
// //   	iconLayout: {
// //     		width: "29.7%",
// //     		height: "100%",
// //     		top: "0%",
// //     		maxHeight: "100%",
// //     		maxWidth: "100%",
// //     		bottom: "0%",
// //     		position: "absolute",
// //     		overflow: "hidden"
// //   	},
// //   	text2Position: {
// //     		marginLeft: -193,
// //     		textAlign: "left",
// //     		fontWeight: "500",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		position: "absolute"
// //   	},
// //   	sedTypo: {
// //     		lineHeight: 20,
// //     		color: "#96a2a3",
// //     		fontSize: 12,
// //     		textAlign: "left",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		top: "50%",
// //     		left: "0%",
// //     		position: "absolute",
// //     		width: "100%"
// //   	},
// //   	icon: {
// //     		width: "4.66%",
// //     		top: "5.26%",
// //     		right: "95.34%",
// //     		maxHeight: "100%",
// //     		maxWidth: "100%",
// //     		bottom: "0%",
// //     		height: "94.74%",
// //     		left: "0%",
// //     		position: "absolute",
// //     		overflow: "hidden"
// //   	},
// //   	medicineDetails: {
// //     		marginTop: -9.5,
// //     		marginLeft: -71.5,
// //     		fontWeight: "600",
// //     		textAlign: "center",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		color: "#252828",
// //     		fontSize: 16,
// //     		position: "absolute"
// //   	},
// //   	icon1: {
// //     		width: "0.52%",
// //     		bottom: "5.26%",
// //     		left: "99.48%",
// //     		right: "0%",
// //     		top: "0%",
// //     		maxHeight: "100%",
// //     		maxWidth: "100%",
// //     		height: "94.74%",
// //     		position: "absolute",
// //     		overflow: "hidden"
// //   	},
// //   	header: {
// //     		top: 48,
// //     		height: 19,
// //     		width: 386,
// //     		overflow: "hidden"
// //   	},
// //   	mask: {
// //     		borderRadius: 12,
// //     		backgroundColor: "#e8ebf1"
// //   	},
// //   	slidersIcon: {
// //     		top: 340,
// //     		left: 155,
// //     		width: 76
// //   	},
// //   	card: {
// //     		top: 97,
// //     		height: 345,
// //     		width: 386
// //   	},
// //   	rectangle: {
// //     		shadowColor: "rgba(0, 0, 0, 0.04)",
// //     		shadowOffset: {
// //       			width: 0,
// //       			height: 2
// //     		},
// //     		shadowRadius: 48,
// //     		elevation: 48,
// //     		shadowOpacity: 1,
// //     		borderTopLeftRadius: 30,
// //     		borderTopRightRadius: 30,
// //     		backgroundColor: "#fff",
// //     		top: 0,
// //     		height: 420,
// //     		width: 350
// //   	},
// //   	rectangle1: {
    	
// //     		left: 189,
// //     		borderRadius: 3,
// //     		backgroundColor: "#e3edee",
// //     		width: 36
// //   	},
// //   	heartMedications: {
// //     		marginTop: -30,
// //     		textAlign: "left",
// //     		marginLeft: -106,
// //     		fontWeight: "500",
// //     		fontSize: 22,
// //     		color: "#252828",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		position: "absolute"
// //   	},
// //   	byQuicheHollandais: {
// //     		marginTop:6,
// //     		color: "#96a2a3",
// //     		fontSize: 12,
// //     		textAlign: "left",
// //     		marginLeft: -106,
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		position: "absolute"
// //   	},
// //   	text: {
// //     		top: 30,
// //     		width: 212
// //   	},
// //   	icon2: {
// //     		right: "70.3%",
// //     		left: "0%"
// //   	},
// //   	text1: {
// //     		marginTop: -11,
// //     		marginLeft: -6.5,
// //     		fontSize: 18,
// //     		fontWeight: "500",
// //     		textAlign: "center",
// //     		color: "#252828",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		position: "absolute"
// //   	},
// //   	icon3: {
// //     		left: "70.3%",
// //     		right: "0%"
// //   	},
// //   	add: {
// //     		width: "26.17%",
// //     		left: "73.83%",
// //     		overflow: "hidden"
// //   	},
// //   	text2: {
// //     		marginTop: -13,
// //     		color: "#5fd3b0",
// //     		fontSize: 22,
// //     		marginLeft: -193
// //   	},
// //   	item: {
// //     		top: 108,
// //     		height: 30,
// //     		width: 386,
// //     		overflow: "hidden"
// //   	},
// //   	about1: {
// //     		marginTop: -73.5,
// //     		marginLeft: -193,
// //     		color: "#252828",
// //     		fontSize: 16
// //   	},
// //   	donecPosuereTorto: {
// //     		marginTop: -40.5
// //   	},
// //   	sedSedDolor: {
// //     		marginTop: 33.5
// //   	},
// //   	about: {
// //     		top: 158,
// //     		height: 147,
// //     		width: 386,
// //     		overflow: "hidden"
// //   	},
// //   	rectangle2: {
// //     		borderRadius: 24,
// //     		backgroundColor: "#1b3c74",
// //     		left: "0%",
// //     		width: "100%"
// //   	},
// //   	addToCart: {
// //     		marginTop: -7,
// //     		marginLeft: -47,
// //     		textTransform: "uppercase",
// //     		fontWeight: "700",
// //     		color: "#fff",
// //     		fontSize: 12,
// //     		textAlign: "center",
// //     		//fontFamily: "SF Pro Text",
// //     		letterSpacing: 1,
// //     		left: "50%",
// //     		top: "50%",
// //     		position: "absolute"
// //   	},
// //   	button: {
// //     		top: 325,
// //     		width: 360,
// // 			marginLeft: 18,
// // 			marginTop: 20,
// //         borderRadius:10,
// //   	},
// //   	section: {
// //     		top: 472
// //   	},
// //   	view: {
// //     		backgroundColor: "#fafafa",
// //     		flex: 1,
// //     		height: 896,
// //     		overflow: "hidden",
// //     		width: "100%"
// //   	}
// // });


//  MedInfo = () => {
//   const [drugInfo, setDrugInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDrugInfo = async () => {
//       try {
//         const response = await fetch(`${CONFIG.API_URL}/drugs/doxycycline`); // Adjust the endpoint as necessary
//         const data = await response.json();
//         setDrugInfo(data);
//       } catch (error) {
//         console.error('Error fetching drug info:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrugInfo();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View style={styles.view}>
//       <View style={[styles.header, styles.cardPosition]}>
//         <Image style={styles.icon} resizeMode="cover" source={require('./icon.png')} />
//         <Text style={styles.medicineDetails}>Medicine Details</Text>
//         <Image style={styles.icon1} resizeMode="cover" source={require('./icon.png')} />
//       </View>
//       <View style={[styles.card, styles.cardPosition]}>
//         <View style={styles.maskPosition}>
//           <View style={[styles.mask, styles.maskPosition]} />
//         </View>
//         <Image style={[styles.slidersIcon, styles.rectangle1Layout]} resizeMode="cover" source={require('./icon.png')} />
//       </View>
//       <View style={[styles.section, styles.sectionLayout]}>
//         <Text style={styles.heartMedications}>{drugInfo.drug_name}</Text>
//         <Text style={styles.byQuicheHollandais}>Condition: {drugInfo.medical_condition}</Text>
//         <Text style={styles.text2}>Side Effects: {drugInfo.side_effects}</Text>
//         <Text style={styles.text2}>Generic Name: {drugInfo.generic_name}</Text>
//         <Text style={styles.text2}>Drug Classes: {drugInfo.drug_classes}</Text>
//         <Text style={styles.text2}>Rating: {drugInfo.rating}</Text>
//         <Text style={styles.text2}>No. of Reviews: {drugInfo.no_of_reviews}</Text>
//         <Text style={styles.text2}>Drug Link: {drugInfo.drug_link}</Text>
//         <Text style={styles.text2}>Medical Condition URL: {drugInfo.medical_condition_url}</Text>
//         {/* Add more fields as needed */}
//         <View style={[styles.button, styles.textPosition]}>
//           <View style={[styles.rectangle2, styles.addPosition]} />
//           <Text style={styles.addToCart}>Add To Cart</Text>
//         </View>
//       </View>
//     </View>
//   );
// }
// }
// const styles = StyleSheet.create({
// 	cardPosition: {
// 		left: 14,
// 		position: "absolute",
// 		width: "100%", // Use percentages for responsiveness
// 		maxWidth: 386,
// 	},
// 	maskPosition: {
// 		height: 330,
// 		left: 0,
// 		top: 0,
// 		width: "100%", // Use percentages for responsiveness
// 		maxWidth: 386,
// 		position: "absolute",
// 	},
// 	rectangle1Layout: {
// 		height: 5,
// 		position: "absolute",
// 	},
// 	sectionLayout: {
// 		height: 424,
// 		width: "100%", // Use percentages for responsiveness
// 		maxWidth: 414,
// 		left: 0,
// 		position: "absolute",
// 	},
// 	textPosition: {
// 		height: 48,
// 		left: 14,
// 		position: "absolute",
// 		overflow: "hidden",
// 	},
// 	addPosition: {
// 		height: "100%",
// 		right: 0,
// 		top: 0,
// 		bottom: 0,
// 		position: "absolute",
// 	},
// 	iconLayout: {
// 		width: "29.7%",
// 		height: "100%",
// 		top: 0,
// 		maxHeight: "100%",
// 		maxWidth: "100%",
// 		bottom: 0,
// 		position: "absolute",
// 		overflow: "hidden",
// 	},
// 	text2Position: {
// 		marginLeft: -193,
// 		textAlign: "left",
// 		fontWeight: "500",
// 		letterSpacing: 1,
// 		left: "50%",
// 		top: "50%",
// 		position: "absolute",
//     }
// });

