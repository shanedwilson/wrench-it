import axios from 'axios';

const apiUrl = '/api/parts/';

const getAllParts = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}`)
  .then((results)=> {
    const parts = results.data;
    resolve(parts);
  })
  .catch((error) => {
    reject(error);
  })
})

const getPartsByMachineId = (id) => new Promise((resolve, reject) => {
    axios.get(`${apiUrl}machineparts/${id}`)
      .then((results) => {
        const partsObject = results.data;
        resolve(partsObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  export default { getPartsByMachineId, getAllParts };