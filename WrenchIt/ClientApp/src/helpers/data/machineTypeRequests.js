import axios from 'axios';
import constants from '../constants';

const apiUrl = `${constants.apiUrl}/machinetypes`;
// const apiUrl = '/api/machinetypes';

const getAllMachineTypes = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((results) => {
      const machineTypesObject = results.data;
      resolve(machineTypesObject);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getAllMachineTypes };
