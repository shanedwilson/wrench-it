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

  const getSinglePart = partId => axios.get(`${apiUrl}/${partId}`);

  const deletePart = partId => axios.delete(`${apiUrl}/${partId}`);

  const createPart = partObject => axios.post(`${apiUrl}`, (partObject));

  const updatePart = (id, partObject) => axios.put(`${apiUrl}/${id}`, (partObject));

  export default { getPartsByMachineId, getAllParts, createPart, updatePart, getSinglePart, deletePart };
