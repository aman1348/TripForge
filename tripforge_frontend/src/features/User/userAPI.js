// const url_prefix = "http://localhost:5000"
const url_prefix = ""

export function createUserInfo(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${url_prefix}/userInfo/add-info`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUserInfo(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${url_prefix}/userInfo/updateUser`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function getUserInfo(email) {
  return new Promise(async (resolve, reject) => {
    try {
      
      const response = await fetch(`${url_prefix}/userInfo/${email}`);
      const data = await response.json();
      if(response.ok) {
        resolve({ data });
      }
      else {
        reject({data})
      }
    }
    catch(err) {
      reject({err})
    }
  });
}