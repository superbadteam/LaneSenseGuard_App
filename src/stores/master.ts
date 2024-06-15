import { defineStore } from "pinia";

export const useMasterStore = defineStore({
    id: "master",
    state: () => ({
        led_left: 0,
        led_right: 0,
        system_status: 0,
        time: 0,
        totalUsers: 0,
        buzzer: 0,
        buzzer_volume: 0,
        deplay: 0
    }),
    getters: {
        getLedLeft(): number {
            return this.led_left;
        },
        getLedRight(): number {
            return this.led_right;
        },
        getSystemStatus(): number {
            return this.system_status;
        },
        getTime(): number {
            return this.time;
        },
        getTotalUsers(): number {
            return this.totalUsers;
        },
        getBuzzer(): number {
            return this.buzzer;
        },
        getBuzzerVolume(): number {
            return this.buzzer_volume;
        },
        getDelay(): number {
            return this.deplay;
        }
    },
    actions: {
        setTotalUsers(totalUsers: number) {
            this.totalUsers = totalUsers;
        },
        setLedLeft(led_left: number) {
            this.led_left = led_left;
        },
        setLedRight(led_right: number) {
            this.led_right = led_right;
        },
        setSystemStatus(system_status: number) {
            this.system_status = system_status;
        },
        setTime(time: number) {
            this.time = time;
        },
        setBuzzer(buzzer: number) {
            this.buzzer = buzzer;
        },
        setBuzzerVolume(buzzer_volume: number) {
            this.buzzer_volume = buzzer_volume;
        },
        setDelay(deplay: number) {
            this.deplay = deplay;
        }
    },
});