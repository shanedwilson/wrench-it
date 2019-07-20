import axios from 'axios';

const apiUrl = '/api/parttypes';

const getAllPartTypes = () => new Promise((resolve, reject) => {
    axios.get(apiUrl)
      .then((results) => {
        const partTypesObject = results.data;
        resolve(partTypesObject);
      })
      .catch((error) => {
        reject(error);
      });
  });

  export default { getAllPartTypes };
