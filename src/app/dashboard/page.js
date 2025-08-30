"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/utils/auth";
import { connectSocket, getSocket } from "@/lib/socket";

export default function DashboardPage() {
  const router = useRouter();
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
      return;
    }

    const socket = connectSocket();
    if (!socket) return;

    socket.on("charger:update", (data) => {
      console.log("Received charger update:", data);
      setChargers((prev) => {
        const index = prev.findIndex((c) => c.chargerId === data.chargerId);
        if (index > -1) {
          prev[index] = data;
          return [...prev];
        } else {
          return [...prev, data];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Logout
      </button>
      <h3 className="text-xl font-semibold mb-2">Your Chargers</h3>
      <ul className="list-disc pl-5">
        {chargers.map((c) => (
          <li key={c.chargerId}>
            {c.chargerId} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
