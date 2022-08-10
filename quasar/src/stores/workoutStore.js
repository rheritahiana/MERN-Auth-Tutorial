import { defineStore } from "pinia";
import { useAuthStore } from "stores/authStore";
export const useWorkoutStore = defineStore("workout", {
  state: () => ({
    workouts: [],
  }),
  getters: {},
  actions: {
    // get All workouts
    async fetchWorkouts() {
      const authStore = useAuthStore();
      if (authStore.user) {
        const response = await fetch("/api/workouts", {
          headers: { Authorization: `Bearer ${authStore.user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          //console.log("workouts : ", json);
          this.workouts = json;
        }
      } else {
        console.log("no user");
      }
    },

    // create new workout
    async createWorkout(title, load, reps) {
      const authStore = useAuthStore();

      if (authStore.user) {
        const workout = { title, load, reps };
        const response = await fetch("/api/workouts", {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          console.log("response", json);
          this.fetchWorkouts();
        } else {
          console.log("erreur");
        }
      } else {
        console.log("no user");
      }
    },

    async deleteWorkout(workout) {
      const authStore = useAuthStore();

      if (!authStore.user) {
        return;
      }

      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        this.fetchWorkouts();
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
