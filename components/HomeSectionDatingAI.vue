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
    <v-row no-gutters>
      <v-col class="text-center">
        <v-img min-width="240px" max-width="720px" src="/img/cards.webp" width="100%"></v-img>
      </v-col>
      <v-col>
        <br>
        <p style="font-size: 1.5rem; max-width: 720px;">What if...</p>
        <p style="font-size: 1.5rem; max-width: 720px;">I can use AI to mimic the people around me, to <span
            class="font-italic">manipulate</span> the perception of me, to show common interest, to be... <span
            class="font-weight-bold font-italic">not me</span>.</p>
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