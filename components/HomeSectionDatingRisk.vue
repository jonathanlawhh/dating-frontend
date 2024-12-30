<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" lg="4">
        <h3 style="font-size: 3rem">The risk and dangers of online dating</h3>
      </v-col>
      <v-col cols="12" md="9" lg="6">
        <v-row no-gutters>
          <v-col v-for="(r, i) in risks" :key="i">
            <v-sheet class="pa-8 ma-2 rounded-shaped text-center">
              <p style="font-size: 1.2rem">{{ r }}</p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeSectionDatingRisk",
  data: () => ({
    risks: ['Catfishing', 'Cyberbullying', 'Sexual Coercion', 'Stalking', 'Harassment', 'Unsafe Meetup', 'Identity Theft']
  }),
  created() {
    this.risks.sort(() => Math.random() - 0.5);
  }
}
</script>
