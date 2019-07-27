import axios from 'axios';

const apiUrl = '/api/serviceparts';

const getAllServicePartsByServiceId = (servicePartId) => new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/${servicePartId}`)
      .then((results) => {
        const servicePartsObject = results.data;
        resolve(servicePartsObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createServicePart = (servicePartObject) => new Promise((resolve, reject) => {
    axios.post(apiUrl, servicePartObject)
      .then((results) => {
        const servicePartObject = results.data;
        resolve(servicePartObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const deleteServicePart = servicePartId => axios.delete(`${apiUrl}/${servicePartId}`);

  export default { getAllServicePartsByServiceId, createServicePart, deleteServicePart };
