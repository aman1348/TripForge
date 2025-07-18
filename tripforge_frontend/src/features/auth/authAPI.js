// const url_prefix = "http://localhost:5000"
const url_prefix = ""

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${url_prefix}/users/signup-user`, {
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
      const response = await fetch(`${url_prefix}/users/login-user`, {
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

export function verifyOTP(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {      
      const response = await fetch(`${url_prefix}/users/verify-otp`, {
        method: "POST",
        body: JSON.stringify(userInfo),
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

export function updatePassword(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      
      const response = await fetch(`${url_prefix}/users/reset-password`, {
        method: "POST",
        body: JSON.stringify(userInfo),
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

export function get_otp(user_data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${url_prefix}/users/request-otp`, {
        method: "POST",
        body: JSON.stringify(user_data),
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
      const response = await fetch(`${url_prefix}/users/check`);
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
