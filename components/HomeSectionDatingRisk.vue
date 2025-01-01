<template>
  <v-container>
    <v-row style="min-height: 480px">
      <v-col cols="12" md="3" lg="4" class="mx-auto">
        <div class="d-flex fill-height align-center justify-center">
          <p style="font-size: 3rem">The <span class="red-flag-text">red flags</span> of online dating</p>
        </div>
      </v-col>
      <v-col cols="12" md="9" lg="6" class="mx-auto">
        <div class="d-flex fill-height align-center justify-center">
          <v-row no-gutters>
            <v-col v-for="(r, i) in risks" :key="i">
              <v-sheet class="pa-8 ma-2 rounded-shaped text-center flag-box"
                       :class="risks_active[i] ? 'flag-box-active' : ''">
                <p style="font-size: 1.2rem">{{ r }}</p>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeSectionDatingRisk",
  data: () => ({
    risks: ['Catfishing', 'Cyberbullying', 'Sexual Coercion', 'Stalking', 'Harassment', 'Unsafe Meetup', 'Identity Theft'],
    risks_active: []
  }),
  mounted() {
    this.risks.sort(() => Math.random() - 0.5);

    let tmpRisk = [...new Array(this.risks.length).fill(true), ...new Array(this.risks.length).fill(false)]
    tmpRisk.sort(() => Math.random() - 0.5);

    this.risks_active = tmpRisk
    setInterval(() => {
      this.risks_active.sort(() => Math.random() - 0.5);
    }, 2000)
  }
}
</script>

<style scoped>
.red-flag-text {
  font-weight: bold;
  position: relative;
  text-decoration: underline var(--custom-pink) 8%;
  border-bottom: 6px var(--custom-pink) solid;
}


.flag-box {
  cursor: grab;
}

.flag-box-active {
  transition: ease-in 0.25s;
  border-left: var(--custom-pink) 2px solid;
  border-top: var(--custom-pink) 1px solid;
  border-right: var(--custom-orange) 1px solid;
  border-bottom: var(--custom-orange) 3px solid;
  box-shadow: 5px 2px 10px -3px var(--custom-orange);
}
</style>