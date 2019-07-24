import axios from 'axios';

const apiUrl = '/api/machineparts';

const getAllMachineParts = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const machinePartsObject = results.data;
        resolve(machinePartsObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createMachinePart = machinePartObject => axios.post(`${apiUrl}`, (machinePartObject));

  export default { getAllMachineParts, createMachinePart };
  