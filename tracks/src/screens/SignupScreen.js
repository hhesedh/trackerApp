import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
	const { state, signup } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	console.log(state);
	return (
		<View style={styles.container}>
			<Spacer>
				<Text h3>Sign Up for Tracker</Text>
			</Spacer>
			<Input
				label="Email"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<Spacer />
			<Input
				secureTextEntry
				label="Password"
				value={password}
				onChangeText={setPassword}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{state.errorMessage ? (
				<Text style={styles.errorMessage}>{state.errorMessage}</Text>
			) : null}
			<Spacer />
			<Spacer>
				<Button
					title="Sign  UP"
					onPress={() => signup({ email, password })}
				/>
			</Spacer>
		</View>
	);
};

SignupScreen.navigationOptions = () => {
	return {
		header: null
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 250
	},
	errorMessage: {
		fontSize: 16,
		color: 'red',
		marginLeft: 16,
		marginTop: 16
	}
});

export default SignupScreen;
