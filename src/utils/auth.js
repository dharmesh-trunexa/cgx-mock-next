"use client";

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
