import axios from 'axios';

const apiUrl = '/api/serviceparts';

const getAllServiceParts = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const servicePartsObject = results.data;
        resolve(servicePartsObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createServicePart = servicePartObject => axios.post(`${apiUrl}`, (servicePartObject));

  export default { getAllServiceParts, createServicePart };