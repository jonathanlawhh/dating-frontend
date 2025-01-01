<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
      <PageFooter></PageFooter>
    </v-app>
  </NuxtLayout>
</template>

<script setup>
let title = 'Dating Profiler'
let desc = 'Using large language model to optimize dating profile. Do you know who you are really dating?'

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      hid: "ld-json",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "dateCreated": "2024-12-30T00:00:00-05:00",
        "applicationCategory": "BrowserApplication",
        "name": title,
        "alternateName": "Dating Profiler",
        "url": "https://dating.jonathanlawhh.com/",
        "operatingSystem": "Any"
      })
    }
  ]
})
</script>