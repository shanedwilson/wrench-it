const formatMDYDate = (date) => {
    const inputDate = new Date(date);
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  export default { formatMDYDate };