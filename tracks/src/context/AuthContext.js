import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authreducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signup':
			return { ...state, token: action.payload };
		default:
			return state;
	}
};

const signup = dispatch => async ({ email, password }, callback) => {
	// make api request to sign up with that email and password
	try {
		const response = await trackerApi.post('/signup', {
			email,
			password
		});
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({ type: 'signup', payload: response.data.token });

		// navigate to main flow
		navigate('TrackList');
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign up'
		});
	}
	// if we sign up, modify our state, and say that we are authenticated
	// if signing up fails, we probably need to reflect an error message
	// somewhere
};

const signin = dispatch => {
	return ({ email, password }) => {
		// Try to sigin
		// Handle success by updating state
		// Handle failure by showing error message (somehow)
	};
};

const signout = dispatch => {
	return () => {
		// somehow sign out!!
	};
};
export const { Provider, Context } = createDataContext(
	authreducer,
	{ signup, signout, signin },
	{ token: null, errorMessage: '' }
);
