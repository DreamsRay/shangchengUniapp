import requests from './requests.js';

let getCols = () => {
    return requests.get('api/config/columns/')
        .then(({
            data
        }) => {
            return data.results;
        })
}

let getBanners = () => {
	return requests.get('api/config/banners/')
		.then(({
			data
		}) => {
			return data.results;
		})
}

// let getMembershipTerms = () => {
//     return requests.get('api/configuration/members/')
//         .then(({
//             data
//         }) => {
//             return data.results;
//         })
// }

export default {
    getBanners,
    getCols,
    // getMembershipTerms,
}
