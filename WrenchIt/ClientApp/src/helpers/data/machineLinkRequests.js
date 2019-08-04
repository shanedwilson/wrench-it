import axios from 'axios';

const apiUrl = '/api/machinelinks';

const getAllMachineLinks = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const linksObject = results.data;
        resolve(linksObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const getAllMachineLinksByMachineId = (machineId) => new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/machine/${machineId}`)
      .then((results) => {
        const linksObject = results.data;
        resolve(linksObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createMachineLink = linkObject => axios.post(`${apiUrl}`, (linkObject));

  const deleteMachineLink = linkId => axios.delete(`${apiUrl}/${linkId}`);

  export default { getAllMachineLinks, createMachineLink, deleteMachineLink, getAllMachineLinksByMachineId };
  