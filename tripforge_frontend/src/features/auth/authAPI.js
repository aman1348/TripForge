export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {

        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }

    } catch (err) {
      reject({ err });
    }
  });
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:5000/users/check");
      if (response.ok) {

        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }

    } catch (err) {
      reject({ err });
    }
  });
}
export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
