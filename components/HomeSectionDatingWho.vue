<template>
  <v-sheet class="mx-auto" style="background: none" width="90%">
    <v-slide-group v-model="model" center-active>
      <v-slide-group-item v-for="(c, n) in card_details" :key="n" v-slot="{ isSelected, toggle }">
        <v-card color="secondary" class="ma-4 dating-who-card" @click="toggle" style="transition: 0.1s ease-in"
                :style="isSelected ? 'transform: scale(1.03)' : ''">
          <v-row class="text-center text-white fill-height align-center justify-center">
            <v-col cols="12" class="mt-4">
              <p class="dating-person-font">"{{ c.who }}"</p>
            </v-col>
            <v-col cols="12" md="6" class="pa-8">
              <div class="d-flex fill-height align-center justify-center">
                <p>{{ c.who_detail }}</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pa-8">
              <div class="d-flex fill-height align-center justify-center pa-4 dating-who-not-card"
                   style="background: var(--custom-pink)">
                <p>{{ c.not_who_detail }}</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "HomeSectionDatingWho",
  data: () => ({
    model: 0,
    card_details: [
      {
        'who': 'co-worker',
        'who_detail': 'That cheeky co-worker from accounting',
        'not_who_detail': 'This person knows too much about you'
      }, {
        'who': 'neighbour',
        'who_detail': 'The one who stays opposite you and plays with your pet',
        'not_who_detail': 'Always beside your house, but does not stay there'
      }, {
        'who': 'student',
        'who_detail': 'The one from the study group at the library',
        'not_who_detail': 'A seemingly young person who overuses Gen Z slang'
      }, {
        'who': 'model',
        'who_detail': 'The online vlogger model at Twitch',
        'not_who_detail': 'The modelling agency that you do not want to get into'
      },
    ]
  }),
  mounted() {
    setInterval(() => {
      this.model = (this.model + 1 < this.card_details.length) ? this.model + 1 : 0
    }, 3500)
  }
}
</script>

<style scoped>
.dating-person-font {
  font-size: 2rem;
}

.dating-who-card {
  width: 640px;
  min-height: 320px;
  box-shadow: 0 0 25px -10px var(--custom-orange);
}

.dating-who-not-card {
  min-height: 200px;
  border-radius: 8px;
}

@media only screen and (max-width: 600px) {
  .dating-who-card {
    width: 240px;
  }

  .dating-who-not-card {
    max-height: 180px;
  }
}
</style>