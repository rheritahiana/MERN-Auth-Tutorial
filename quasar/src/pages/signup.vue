<template>
  <q-page class="flex flex-center">
    <q-card
      class="
        marg
        no-shadow
        transparent
        q-pa-lg
        no-shadow
        bord
        q-mx-lg
        justify-center
        text-center
      "
      style="min-width: 300px; max-width: 400px"
    >
      <q-card-section> S'enregistrer </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="formSignup"
        >
          <q-input
            rounded
            outlined
            dense
            v-model="email"
            label="Email *"
            hint="adresse email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'requis',
              (val) => !!val || 'Adresse email invalide',
              isValidEmail,
            ]"
          />

          <q-input
            rounded
            outlined
            dense
            type="password"
            v-model="password"
            label="Mot de passe *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'requis']"
          />

          <div>
            <q-btn
              rounded
              label="s'enregistrer"
              type="submit"
              color="primary"
            />
            <q-btn
              rounded
              label="annuler"
              type="reset"
              color="secondary"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useAuthStore } from "stores/authStore";
import { useRouter, useRoute } from "vue-router";
//stores
const authStore = useAuthStore();
//---router
const router = useRouter();
const route = useRoute();

const $q = useQuasar();
const email = ref("rheritahiana@techmedia.mg");
const password = ref("Tech123456*");
const formLogin = ref(null);

function onSubmit() {
  authStore.signup(email.value, password.value);
}

function onReset() {
  email.value = null;
  password.value = null;
}

function isValidEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Email invalide";
}
</script>
