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

  export default { getAllServiceParts, createServicePart };
  