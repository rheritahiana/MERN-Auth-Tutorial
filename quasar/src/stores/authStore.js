import { defineStore } from "pinia";
import { useUsersStore } from "stores/usersStore";
import { useWorkoutStore } from "stores/workoutStore";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isEditor: false,
    isAdmin: false,
    isAuthenticated: false,
    user: null,
  }),
  getters: {},
  actions: {
    async login(email, password) {
      // update loading state
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        console.log("error :", "error");
      }
      if (response.ok) {
        // save the user to local storage
        console.log("isAuthenticated");
        this.user = json;
        this.isAuthenticated = true;

        if (json.roles.includes("admin")) {
          this.isAdmin = true;
        }

        // update loading state
      }
    },

    async signup(email, password) {
      console.log("email", email);
      console.log("password", password);
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        console.log("error", json.error);
      }
      if (response.ok) {
        this.user = json;
        this.isAuthenticated = true;

        // update loading state
      }
    },

    async logout() {
      const usersStore = useUsersStore();
      const workoutStore = useWorkoutStore();

      usersStore.users = [];
      workoutStore.workouts = [];

      this.user = null;
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.isEditor = false;
    },
  },
  persist: {
    enabled: true,
  },
});
