<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="#f39314">
          <v-card-item>
            <v-row>
              <v-col cols="12">
                <p style="font-size: 3rem">Tell me more about <strong>yourself</strong></p>
                <p>No data is stored, and no personal identifiable data is required.</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                    :items="countries"
                    :model-value="profileData.country"
                    density="compact"
                    label="I am from"
                ></v-select>
              </v-col>

              <v-col cols="6" md="3">
                <v-checkbox label="Spotify" :model-value="profileData.profile.spotify"></v-checkbox>
              </v-col>
              <v-col cols="6" md="3">
                <v-checkbox label="Currently Travelling" :model-value="profileData.profile.traveling"></v-checkbox>
              </v-col>

              <v-col cols="12">
                <v-textarea label="Bio" :model-value="profileData.profile.bio" variant="outlined"
                            placeholder="Here to have some fun..." no-resize></v-textarea>
              </v-col>

              <v-col cols="10" md="6">
                <v-text-field label="I work at" v-model="profileData.profile.job.company"
                              variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="10" md="6">
                <v-text-field label="My job title is" v-model="profileData.profile.job.job_title"
                              variant="outlined"></v-text-field>
              </v-col>

            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DatingOptimizerCard",
  data: () => ({
    profileData: {
      country: 'MY',
      profile: {
        spotify: true,
        traveling: false,
        bio: '',
        birth_date: '',
        interest: [],
        descriptors: [],
        job: {company: '', job_title: ''}
      }
    },
    countries: ['MY', 'DE', 'JP', 'NL']
  })
}
</script>
