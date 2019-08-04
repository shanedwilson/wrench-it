import axios from 'axios';

const apiUrl = '/api/links';

const getAllLinks = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const linksObject = results.data;
        resolve(linksObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const getAllLinksByMachineId = (machineId) => new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/machine/${machineId}`)
      .then((results) => {
        const linksObject = results.data;
        resolve(linksObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const createLink = linkObject => axios.post(`${apiUrl}`, (linkObject));

  const deleteLink = linkId => axios.delete(`${apiUrl}/${linkId}`);

  export default { getAllLinks, createLink, deleteLink, getAllLinksByMachineId };
  