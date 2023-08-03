import { io } from "socket.io-client"

// const URL = import.meta.env.VITE_APP_SERVER_URL

///CHANGES i made fro deployment
const URL = "https://curiousone.online/"

export const socket = io(URL, {
  autoConnect: false,
  secure: true,
})