import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export async function postUsers(body) {
  const url = `/api/users`;

  axios
    .post(url, body)
    .then(function (response) {
      alert("El Usuario fue creado con éxito");
      return response;
    })
    .catch(function (error) {
      alert(error.response.data);
      return error;
    });
}

export async function getUsers() {
  const url = `/api/users`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
}

export async function getUserById(id) {
  const url = `/api/users/${id}`;
  axios
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
}

export async function updateUserRole(id, newRole) {
  const url = `/api/users/update/${id}?role=${newRole}`;

  axios
    .put(url) // Agregar restriccion
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      alert(error.response.data);
      return error;
    });
}
