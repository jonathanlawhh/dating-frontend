<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" max-width="960px" class="mx-auto">
          <v-card-item>
            <v-row>
              <v-col cols="12">
                <p style="font-size: 3rem">Dating profile optimizer using AI</p>
                <p v-if="step == 1">Tell me more about <strong>yourself</strong>, like your real Tinder profile.</p>
              </v-col>

              <v-col cols="12">
                <p>Step {{ step }} / {{ max_step }}</p>
              </v-col>

              <v-col cols="12">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-card-text>
                      <v-select
                          :items="countries"
                          :model-value="profileData.country"
                          density="compact"
                          label="I am from"
                      ></v-select>
                      <v-checkbox label="I am currently travelling"
                                  :model-value="profileData.profile.traveling"></v-checkbox>
                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="2">
                    <v-card-text>
                      <v-textarea label="Bio" :model-value="profileData.profile.bio" variant="outlined"
                                  placeholder="Here to have some fun..." no-resize></v-textarea>
                      <v-checkbox label="My spotify is connected to my account"
                                  :model-value="profileData.profile.spotify"></v-checkbox>
                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="3">
                    <v-card-text>
                      <v-btn class="mr-2 mt-2 mb-2" :variant="isWorking ? 'flat' : 'tonal'" @click="isWorking = true">
                        Working
                      </v-btn>
                      <v-btn class="ma-2" :variant="!isWorking ? 'flat' : 'tonal'" @click="isWorking = false">Studying
                      </v-btn>

                      <v-text-field v-if="isWorking" label="I work at" placeholder="Some big 4"
                                    v-model="profileData.profile.job.company"
                                    variant="outlined"></v-text-field>
                      <v-text-field v-if="isWorking" label="My job title is" placeholder="Accountant..."
                                    v-model="profileData.profile.job.job_title"
                                    variant="outlined"></v-text-field>

                      <v-text-field v-if="!isWorking" label="I study at" placeholder="Harvard University"
                                    v-model="profileData.profile.school.name"
                                    variant="outlined"></v-text-field>
                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="4">
                    <v-card-text>
                      <span>Interest as on your dating profile</span>
                      <v-chip-group column>
                        <v-chip v-for="(interest, i) in profileData.profile.interest.sort()" variant="tonal" :key="i"
                                :text="interest" @click="profileData.profile.interest.sort().splice(i, 1)"
                                append-icon="mdi-close"></v-chip>
                      </v-chip-group>

                      <v-text-field label="Search" placeholder="Netflix" variant="outlined" @keyup="filtered_interest_list = interest_list.filter((il) => {
                        return il.name.toUpperCase().indexOf(interest_search.toUpperCase()) > -1
                      })" v-model="interest_search"></v-text-field>

                      <div style="max-height: 320px; overflow-y: scroll">
                        <v-chip-group column multiple>
                          <v-chip
                              v-for="(il, i) in filtered_interest_list"
                              @click="!profileData.profile.interest.includes(il.name) && profileData.profile.interest.push(il.name)"
                              variant="outlined"
                              :key="i"
                              :text="il.name"
                          ></v-chip>
                        </v-chip-group>
                      </div>

                    </v-card-text>
                  </v-window-item>

                  <v-window-item :value="5">
                    <v-card-text>
                      <span>Prompts</span>

                    </v-card-text>
                  </v-window-item>
                </v-window>
              </v-col>


            </v-row>
          </v-card-item>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn v-if="step > 1" variant="text" @click="step--">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="step < max_step" color="primary" variant="flat" @click="step++">
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12">
        <p class="text-center">**No data is stored, and no personal identifiable data is required.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {interests} from "@/assets/static-data.js";

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
        job: {company: '', job_title: ''},
        school: {name: ''}
      }
    },
    countries: ['MY', 'DE', 'JP', 'NL'],
    step: 1,
    max_step: 5,
    interest_search: '',
    interest_list: [],
    filtered_interest_list: [],
    prompts: [],
    isWorking: true,
  }),
  mounted() {
    this.interest_list = interests
    this.filtered_interest_list = interests
  }
}
</script>
