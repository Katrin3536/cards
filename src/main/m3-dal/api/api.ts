import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

// ==== AUTHORIZATION ====

export const authAPI = {
  authMe() {
    return instance.post(`auth/me`, {}).then((response) => response.data);
  },

  login() {
    return instance
      .post(`auth/login`, {
        email: "maxpredko@gmail.com",
        password: "123456789",
        rememberMe: false,
      })
      .then((response) => response.data);
  },

  logout() {
    return instance.delete(`auth/me`).then((response) => response.data);
  },
};

// ==== REGISTRATION ====

export const registrationAPI = {
  createUser(email:string, password:string) {
    return instance.post(`auth/register`, {email, password})
  }
};

// ==== FORGOT PASSWORD ====
export const forgotPassAPI = {
  forgot(email: string) {
    const data = {
      email: email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link</a>
                </div>`,
    };
    return instance.post(`auth/forgot`, data);
  },

  createNewPassword(password: string, resetPasswordToken: string | undefined) {
    return instance.post(`auth/set-new-password`, {
      password,
      resetPasswordToken,
    });
  },
};
// ==== TYPES ====
