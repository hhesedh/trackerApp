import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authreducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signin':
            return { ...state, token: action.payload };
        case 'clear_error_message':
            return {...state, errorMessage: ''}
		default:
			return state;
	}
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}

const signup = dispatch => async ({ email, password }, callback) => {
	// make api request to sign up with that email and password
	try {
		const response = await trackerApi.post('/signup', {
			email,
			password
		});
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({ type: 'signin', payload: response.data.token });

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

const signin = dispatch => async ({ email, password }) => {
	try {
		const response = await trackerApi.post('/signin', { email, password });
		await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Something went wrong with sign in'
		});
	}
};

const signout = dispatch => {
	return () => {
		// somehow sign out!!
	};
};
export const { Provider, Context } = createDataContext(
	authreducer,
	{ signup, signout, signin, clearErrorMessage },
	{ token: null, errorMessage: '' }
);
