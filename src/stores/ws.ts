import { defineStore } from "pinia";
interface Message {
    led_right: number;
    led_left: number;
    system_status: number;
    time: number;
}
export const useSocketStore = defineStore({
    id: "socket-common",
    state: () => ({
        isConnected: false,
        message: {} as Message,
        socket: null as any,
        url: "",
        delay: 0,
    }),
    getters: {
        isOnline(): boolean {
            return this.isConnected;
        },
    },
    actions: {
        connect(callback) {
            this.socket = new WebSocket("ws://103.77.246.238:8765")
            this.socket.onmessage = (event) => {
              this.message = JSON.parse(event.data);
            };
            this.socket.onopen = () => {
                this.isConnected = true;
                console.log("Connected");
                callback();
            };
            this.socket.onclose = () => {
                this.isConnected = false;
                console.log("Disconnected");
                const reconnect = setTimeout(() => {
                    console.log("Reconnecting...");
                    this.connect();
                    clearTimeout(reconnect);
                }, 1000);
            };
        },
        disconnect() {
            this.isConnected = false;
            console.log("Disconnected");
        },
        sendMessage(val) {
            this.socket.send(JSON.stringify(val));
        },
        setDelay(delay: number) {
            this.delay = delay;
        }
    },
});