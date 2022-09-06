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

export function getInventario(id) {
  return new Promise((resolve, reject) => {
    client
      .get(`/inventario?id=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getStatus(id) {
  return new Promise((resolve, reject) => {
    client
      .get(`/status?id=${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateStatus(id, status) {
  return new Promise((resolve, reject) => {
    client
      .post(`/update_status?id=${id}&status=${status}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createPersonagem(nome, campanha) {
  return new Promise((resolve, reject) => {
    client
      .post(`/create_personagem?nome=${nome}&campanha=${campanha}&status=[]`)
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
      .delete(`/removeItem?idPersonagem=${idPersonagem}&idItem=${idItem}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
