"use client";
import { io } from "socket.io-client";
import { getToken } from "@/utils/auth";

let socket;

export const connectSocket = () => {
  const token = getToken();
  if (!token) return null;

  const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

  socket = io(WS_URL, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => console.log("Connected to socket:", socket.id));
  socket.on("disconnect", (reason) =>
    console.log("Socket disconnected:", reason)
  );
  socket.on("reconnect", (attemptNumber) =>
    console.log("Reconnected after attempt:", attemptNumber)
  );

  return socket;
};

export const getSocket = () => socket;
