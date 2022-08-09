<template>
  <q-page>
    <div v-if="isAuthenticated" class="row">
      <div class="col-12 col-md-8">
        <q-card class="transparent " flat>
          <q-card-section>
            <div class="q-pa-sm q-gutter-md">
              <q-list bordered class="rounded-borders" style="max-width: 600px">
                <q-item-label header>Utilisateurs</q-item-label>

                <template v-for="(user, index) in users" :key="index">
                     <q-item>
                    <q-item-section top class="col-2 ">
                      <q-item-label class="q-mt-sm">{{
                        user.email
                      }}</q-item-label>
                    </q-item-section>

<q-space />

                    <q-item-section top side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn

                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="deleteUser(user)"
                        />
                      <!--   <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="edit"
                        /> -->
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </template>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card flat class="transparent">
          <q-card-section> Insérez un utilisateur </q-card-section>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="formCreateUser"
            >
              <q-input
                rounded
                outlined
                dense
                type="text"
                v-model="displayName"
                label="Nom"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'requis']"
              />
              <q-input
                rounded
                outlined
                dense
                type="text"
                v-model="email"
                label="Email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'requis']"
              />

              <q-input
                rounded
                outlined
                dense
                type="password"
                v-model="password"
                label="Mot de passe"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'requis']"
              />

              <div>
                <q-btn rounded label="Créer" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else>Pas d'utilisateurs</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "stores/authStore";
import { useUsersStore } from "stores/usersStore";
//---router
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
//stores

//cycles
onMounted(() => {
  usersStore.fetchUsers();
});
//data
const displayName = ref("");
const email = ref("");
const password = ref("");
const roles = ref([]);

const authStore = useAuthStore();
const usersStore = useUsersStore();
const user = computed(() => authStore.user);
const users = computed(() => usersStore.users);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
function onSubmit() {
  usersStore.createUser(displayName.value, email.value, password.value);
  onReset();
}

function onReset() {
  displayName.value = "";
  email.value = "";
  password.value = "";
}

function deleteUser(user) {
  usersStore.deleteUser(user);
}
</script>
