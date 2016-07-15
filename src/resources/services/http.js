import axios from 'axios';

var apiUrl = "https://api.spotify.com/v1",
	http;

http = {
	get(url, config) {
		url = apiUrl + url;

		return axios.get(url, config);
	},

	post(url, config) {
		url = apiUrl + url;

		return axios.post(url, config);	
	},

	put(url, data, config) {
        url = apiUrl + url;

        return axios.put(url, data, config);
    },

    delete(url, config) {
        url = apiUrl + url;

        return axios.delete(url, config);
    },
};

export default http;