import axios from 'axios';
import constants from 'constants';

const apiUrl = `${constants.apiUrl}/serviceparts`;
// const apiUrl = '/api/serviceparts';

const getAllServicePartsByServiceId = servicePartId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${servicePartId}`)
    .then((results) => {
      const servicePartsObject = results.data;
      resolve(servicePartsObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const createServicePart = servicePartObject => new Promise((resolve, reject) => {
  axios.post(apiUrl, servicePartObject)
    .then((results) => {
      const serviceParts = results.data;
      resolve(serviceParts);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteServicePart = servicePartId => axios.delete(`${apiUrl}/${servicePartId}`);

export default { getAllServicePartsByServiceId, createServicePart, deleteServicePart };
