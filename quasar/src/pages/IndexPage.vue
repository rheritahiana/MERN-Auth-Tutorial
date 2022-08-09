<template>
  <q-page>
    <div v-if="isAuthenticated" class="row">
      <div class="col-12 col-md-8">
        <q-card class="transparent" flat>
          <q-card-section>
            <div class="q-pa-sm q-gutter-md">
              <q-list bordered class="rounded-borders" style="max-width: 600px">
                <q-item-label header>Mes exercices</q-item-label>

                <template v-for="(workout, index) in workouts" :key="index">
                  <q-item>
                    <q-item-section top class="col-2 gt-sm">
                      <q-item-label class="q-mt-sm">{{
                        workout.title
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section top>
                      <q-item-label lines="1">
                        <span class="text-weight-medium">charge: </span>
                        <span class="text-grey-8"> {{ workout.load }} kg</span>
                      </q-item-label>
                      <q-item-label caption lines="1">
                        Répétition:
                        <span class="text-grey-8">
                          {{ workout.reps }} fois</span
                        >
                      </q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="deleteWorkout(workout)"
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
          <q-card-section> Insérez un exercice </q-card-section>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              ref="formCreateWorkout"
            >
              <q-input
                rounded
                outlined
                dense
                type="text"
                v-model="title"
                label="Titre"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'requis']"
              />
              <q-input
                rounded
                outlined
                dense
                type="number"
                v-model="load"
                label="Charge"
              />
              <q-input
                rounded
                outlined
                dense
                type="number"
                v-model="reps"
                label="Repetition"
              />

              <div>
                <q-btn rounded label="Créer" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else>Pas de données</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "stores/authStore";
import { useWorkoutStore } from "stores/workoutStore";
//---router
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
//stores

//cycles
onMounted(() => {
  workoutStore.fetchWorkouts();
});
//data
const title = ref("");
const load = ref("0");
const reps = ref("0");

const authStore = useAuthStore();
const workoutStore = useWorkoutStore();
const user = computed(() => authStore.user);
const workouts = computed(() => workoutStore.workouts);
const isAuthenticated = computed(() => authStore.isAuthenticated);
function onSubmit() {
  workoutStore.createWorkout(title.value, load.value, reps.value);
  onReset();
}

function onReset() {
  title.value = "";
  load.value = "0";
  reps.value = "0";
}

function deleteWorkout(workout) {
  workoutStore.deleteWorkout(workout);
}
</script>
