import client from "./client";

export function getCampanhas() {
  return new Promise((resolve, reject) => {
    // resolve({ data: ["Frango"] });
    client
      .get(`/campanhas`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getItens(campanha) {
  return new Promise((resolve, reject) => {
    client
      .get(`/itens?campanha=${campanha}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getPersonagens(campanha) {
  return new Promise((resolve, reject) => {
    client
      .get(`/personagens?campanha=${campanha}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addItem(idPersonagem, idItem) {
  return new Promise((resolve, reject) => {
    client
      .post(`/addItem?idPersonagem=${idPersonagem}&idItem=${idItem}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function removeItem(idPersonagem, idItem) {
  return new Promise((resolve, reject) => {
    client
      .delete(
        `/personagens?/addItem?idPersonagem=${idPersonagem}&idItem=${idItem}`
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
