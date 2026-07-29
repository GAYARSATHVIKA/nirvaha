import { io } from "socket.io-client";
import BACKEND_CONFIG from "../config/backend";

export const socket = io(BACKEND_CONFIG.SOCKET_BASE_URL, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    withCredentials: true,
});
