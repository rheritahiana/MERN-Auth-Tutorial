<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn flat round icon="mdi-home" to="/" :class="{ active: $route.path === '/' }" />
<q-space />

          <q-btn-group flat rounded>
            <q-btn

              v-if="isAdmin"
              to="/users"
              :class="{ active: $route.path === '/users' }"
              no-caps
              label="utilisateurs"
              icon="mdi-account-group"
            />
            <q-btn
              v-if="isAuthenticated"
              no-caps
              :label="user.email"
              icon="mdi-account"
            />
          <!--   <q-btn
              no-caps
              v-if="!isAuthenticated"
              to="/signup"
              label="s'enregistrer"
              icon="mdi-account-arrow-right"
            /> -->
            <q-btn
              no-caps
              v-if="!isAuthenticated"
              to="/login"
              label="se connecter"
              icon="mdi-login-variant"
            />
            <q-btn
              no-caps
              v-if="isAuthenticated"
              @click="logout"
              label="déconnecter"
              icon="mdi-logout-variant"
            />
          </q-btn-group>
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row"> Tech media </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "stores/authStore";
//---router
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
//stores
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const style = computed(() => ({
  height: $q.screen.height + "px",
}));

function logout() {
  authStore.logout();
}
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.active
  background-color: #009688
  color:#ffffff
</style>
