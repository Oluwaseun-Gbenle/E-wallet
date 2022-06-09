export async function fetchData({axios, setData}) {
    await axios("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setData(response.data.rates);
      })
      .catch((err) => console.log("Request Failed", err));
  };

 export async function fetchUsers({axios, setUsers}) {
    await axios("https://e-wallet.oluwaseun2020.repl.co/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log("Request Failed", err));
  }
  export async function updateAmount({axios,payload}) {
    await axios("https://e-wallet.oluwaseun2020.repl.co/api/update", payload)
      .then((response) => {
        console.log('res', response);
      })
      .catch((err) => console.log("Request Failed", err));
  }

  export const roundOff = (value) =>
    value >= 1000000000
      ? (Math.floor(value / 1000000000) * 1000000000) / 1000000000 + "B"
      : value >= 1000000
      ? (Math.floor(value / 1000000) * 1000000) / 1000000 + "M"
      : value >= 1000
      ? (Math.floor(value / 1000) * 1000) / 1000 + "k"
      : value;