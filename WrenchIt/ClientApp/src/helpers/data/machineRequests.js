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
    axios.get(`${apiUrl}/${id}`)
      .then((results) => {
        const userMachinesObject = results.data;
        resolve(userMachinesObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const getSingleMachine = machineId => axios.get(`${apiUrl}/machine/${machineId}`);

  const createMachine = machineObject => axios.post(`${apiUrl}`, (machineObject));

  const updateMachine = (machineId, machineObject) => axios.put(`${apiUrl}/${machineId}`, machineObject);

  const deleteMachine = machineId => axios.delete(`${apiUrl}/${machineId}`);

  export default {
                    getAllMachines,
                    getAllMachinesById,
                    getSingleMachine,
                    createMachine,
                    updateMachine,
                    deleteMachine,
                };