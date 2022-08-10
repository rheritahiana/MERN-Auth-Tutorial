import { defineStore } from "pinia";
import { useAuthStore } from "stores/authStore";
export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
    // get All users
    async fetchUsers() {

      const authStore = useAuthStore();
      if (authStore.user) {
        const response = await fetch("/api/users", {
          headers: { Authorization: `Bearer ${authStore.user.token}` },
        });


        const json = await response.json();
        if (response.ok) {
          //console.log("Users : ", json);
          this.users = json;
        }
      } else {
        console.log("no user");
      }
    },

    // create new user
    async createUser(displayName, email, roles, password) {
      const authStore = useAuthStore();

      if (authStore.user) {
        const user = { displayName, email, roles, password };
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore.user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          console.log("response", json);
          this.fetchUsers();
        } else {
          console.log("erreur");
        }
      } else {
        console.log("no user");
      }
    },

    async deleteUser(user) {
      const authStore = useAuthStore();

      if (!authStore.user) {
        return;
      }

      const response = await fetch("/api/users/" + user._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        this.fetchUsers();
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
