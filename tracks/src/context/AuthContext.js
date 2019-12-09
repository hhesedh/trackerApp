import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authreducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const signup = dispatch => {
	return async ({ email, password }) => {
		// make api request to sign up with that email and password
		try {
			const response = await trackerApi.post('/signup', {
				email,
				password
			});
			console.log(response.data);
		} catch (err) {
			console.log(err.response.data);
		}
		// if we sign up, modify our state, and say that we are authenticated
		// if signing up fails, we probably need to reflect an error message
		// somewhere
	};
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
export const { Provider, Context } = createDataContext(authreducer, { signup });
