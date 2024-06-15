import { defineStore } from "pinia";
interface Message {
    led_right: number;
    led_left: number;
    system_status: number;
    time: number;
    buzzer: number;
    buzzer_volume: number;
}
export const useSocketStore = defineStore({
    id: "socket-common",
    state: () => ({
        isConnected: false,
        message: {} as Message,
        socket: null as any,
        url: "",
        delay: 0,
        rasID: 0,
    }),
    getters: {
        isOnline(): boolean {
            return this.isConnected;
        },
        getRasID(): number {
            return this.rasID;
        }
    },
    actions: {
        setRasID(rasID: number) {
            this.rasID = rasID;
        },
        connect(callback, id) {
            this.socket = new WebSocket("wss://unlockscan.site:5001")
            this.socket.onmessage = (event) => {
              this.message = JSON.parse(event.data);
            };
            this.socket.onopen = () => {
                this.isConnected = true;
                console.log("Connected", this.rasID);
                callback();
                this.socket.send(JSON.stringify({ rasID: id }));
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
            val.rasID = this.rasID;
            this.socket.send(JSON.stringify(val));
        },
        setDelay(delay: number) {
            this.delay = delay;
        }
    },
});