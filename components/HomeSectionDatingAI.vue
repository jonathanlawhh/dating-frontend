<template>
<v-container class="pa-16">
  <v-row>
    <v-col>
      <h3 class="text-right" style="font-size: 2rem">And the worst part...<span class="random-rotate">?</span></h3>
    </v-col>
    <v-col>
      <h4 class="text-left" style="font-size: 4rem">AI does not make it easier</h4>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "HomeSectionDatingAI"
}
</script>

<style>
.random-rotate {
  display: inline-block;
  animation: twitch 2s infinite;
}


@keyframes twitch {
  0% {
    transform: rotate(0);
  }

  15% {
    transform: rotate(15deg);
  }

  30% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(35deg);
  }

  80% {
    transform: rotate(-20deg);
  }

  95% {
    transform: rotate(0);
  }

}
</style>