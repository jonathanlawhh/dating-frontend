<template>
  <v-row class="welcome-bg ma-0 fill-height align-center justify-center">
    <v-col cols="12">
      <p class="font-weight-bold text-center" style="font-size: 9rem">Who</p>
      <p class="font-weight-bold text-center" style="font-size: 3rem">do you think you are<br>
        <span class="dating-font-color">dating online</span>
      </p>
    </v-col>
  </v-row>

  <v-row class="ml-0 mr-0 mb-16">
    <v-col cols="12">
      <HomeSectionDatingWho></HomeSectionDatingWho>
    </v-col>
  </v-row>

  <v-row class="ma-0">
    <v-col cols="12">
      <HomeSectionDatingRisk></HomeSectionDatingRisk>
    </v-col>
  </v-row>

  <v-row class="ma-0">
    <v-col cols="12">
      <HomeSectionDatingAI></HomeSectionDatingAI>
    </v-col>
  </v-row>

  <v-row class="ma-0">
    <v-col cols="12">
      <DatingOptimizerSection></DatingOptimizerSection>
    </v-col>
  </v-row>

  <v-row class="ma-0">
    <v-col cols="12" style="height: 720px">
<!--      Placeholder -->
    </v-col>
    <v-col cols="12">
      <p class="text-center">Site still under development</p>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: "index",
}
</script>

<style scoped>
.dating-font-color {
  background: -webkit-linear-gradient(var(--custom-orange), var(--custom-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-bg {
  background: url('/img/who-bg.png');
  background-size: auto;
  height: 60vh !important;
  animation: welcome-bg-keyframe 5s infinite;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

@media only screen and (max-width: 600px) {
  .welcome-bg {
    height: 75vh !important;
    background-size: cover;
  }
}

@keyframes welcome-bg-keyframe {
  0% {
    background-position: 0 0
  }
  /*15% {background-position: 16px 16px}*/
  30% {
    background-position: 24px 32px
  }
  /*45% {background-position: 12px 20px}*/
  60% {
    background-position: -12px 0
  }
  75% {
    background-position: 12px -16px
  }
  90% {
    background-position: -4px 2px
  }
  /*100% {transform: translate(-4px, -4px)}*/
}

</style>