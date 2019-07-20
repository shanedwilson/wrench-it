import axios from 'axios';

const apiUrl = '/api/machines';

const getAllMachines = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const machinesObject = results.data;
        resolve(machinesObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  
const getAllMachinesById = (id) => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const userMachinesObject = results.data;
        resolve(userMachinesObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createMachine = machineObject => axios.post(`${apiUrl}`, (machineObject));

  export default { getAllMachines, getAllMachinesById, createMachine };