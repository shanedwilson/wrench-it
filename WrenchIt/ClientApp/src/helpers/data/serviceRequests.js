import axios from 'axios';

const apiUrl = '/api/services';

const getAllServices = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((results) => {
      const servicesObject = results.data;
      resolve(servicesObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleService = serviceId => axios.get(`${apiUrl}/${serviceId}`);

const deleteService = serviceId => axios.delete(`${apiUrl}/${serviceId}`);

const createService = serviceObject => axios.post(`${apiUrl}`, (serviceObject));

const updateService = (serviceId, serviceObject) => axios.put(`${apiUrl}/${serviceId}`, serviceObject);


export default {
  getAllServices,
  createService,
  deleteService,
  updateService,
  getSingleService,
};
