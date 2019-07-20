import axios from 'axios';

const apiUrl = '/api/machinetypes';

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
