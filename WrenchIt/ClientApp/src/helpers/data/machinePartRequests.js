import axios from 'axios';
import constants from '../constants';

const apiUrl = `${constants.apiUrl}/machineparts`;
// const apiUrl = '/api/machineparts';

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

const deleteMachinePart = partId => axios.delete(`${apiUrl}/${partId}`);

export default { getAllMachineParts, createMachinePart, deleteMachinePart };
