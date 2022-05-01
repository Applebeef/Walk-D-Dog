import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class RadioButton extends Component {
	state = {
		value: null,
	};

	render() {
		const { values, onChange } = this.props;
		const { value } = this.state;

		return (
			<View>
				{values.map(res => {
					return (
						<View key={res.key} style={styles.container}>
							
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									this.setState({
										value: res.key,
									});
									onChange(res.key);
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
                            <Text style={styles.radioText}>{res.text}</Text>
						</View>
					);
				})}
                <Text> Selected: {this.state.value} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        marginTop:10,
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-between',
	},
    radioText: {
        marginRight: 35,
        fontSize: 20,
        marginLeft: 10,
        color: 'black',
        fontWeight: '700',
        alignItems: 'center',
		justifyContent: 'center',
    },
	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: '#3740ff',
        marginHorizontal:20,
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});
