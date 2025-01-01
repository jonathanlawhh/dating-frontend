<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" max-width="960px" class="mx-auto">
          <v-card-item>
            <v-row>
              <v-col cols="12" v-if="step === 1">
                <p style="font-size: 3rem">Dating profile optimizer using AI</p>
              </v-col>

              <v-col cols="12">
                <p class="mt-4 ml-4">Step {{ step }} / {{ list_steps.length }} : {{ list_steps[step - 1] }}</p>
              </v-col>

              <v-col cols="12" style="min-height: 420px">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-card-text>
                      <v-select
                          :items="list_countries"
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
                      <v-chip-group column>
                        <v-chip v-for="(interest, i) in profileData.profile.interest" variant="tonal" :key="i"
                                :text="interest" @click="profileData.profile.interest.splice(i, 1)"
                                append-icon="mdi-close"></v-chip>
                      </v-chip-group>

                      <v-text-field label="Search" placeholder="Netflix" variant="outlined" @keyup="filtered_interest_list = list_interests.filter((il) => {
                        return il.name.toUpperCase().indexOf(interest_search.toUpperCase()) > -1
                      })" v-model="interest_search"></v-text-field>

                      <div style="max-height: 240px; overflow-y: scroll">
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
                    <v-card-text style="max-height: 480px; overflow-y: scroll">
                      <p style="font-size: 1.4rem" class="mb-4"></p>
                      <v-row>
                        <v-col cols="12" v-for="(d, di) in list_descriptors" :key="di">
                          <v-sheet elevation="4" class="pa-4">
                            <p style="font-size: 1.1rem" class="mb-2">{{ d.section_name }}</p>

                            <div v-for="(dn, dni) in d.descriptors" :key="dni">
                              <v-autocomplete
                                  :label="dn.name"
                                  :items="dn.choices.map(a => a.name)"
                                  v-model="this.profileData.profile.descriptors[dni + (di > 0 ? cumulative_length[di - 1] : 0)].choice_selections"
                                  variant="outlined"
                                  :multiple="dn.type === 'multi_selection_set'"
                              ></v-autocomplete>
                            </div>
                          </v-sheet>

                        </v-col>
                      </v-row>

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
            <v-btn v-if="step < list_steps.length" color="primary" variant="flat" @click="step++">
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
import {INTERESTS_DATA, DESCRIPTORS_DATA} from "@/assets/static-data.js";

export default {
  name: "DatingOptimizerCard",
  data: () => ({
    list_countries: ['MY', 'DE', 'JP', 'NL'],
    list_interests: [],
    list_descriptors: [],
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
    step: 1,
    list_steps: ['Where are you from',
      'Tell me more about yourself, like your real Tinder profile.',
      'Are you a student or are you working?',
      'Interest as on your dating profile',
      'Common descriptors based on Tinder'],
    interest_search: '',
    filtered_interest_list: [],
    isWorking: true,
    cumulative_length: []
  }),
  mounted() {
    this.list_interests = INTERESTS_DATA.sort()
    this.filtered_interest_list = INTERESTS_DATA.sort()

    let tmpDescriptor = []
    let tmpCumulative = 0
    for (let i = 0; i < DESCRIPTORS_DATA.length; i++) {
      for (let j = 0; j < DESCRIPTORS_DATA[i].descriptors.length; j++) {
        let currentDescriptor = DESCRIPTORS_DATA[i].descriptors[j]
        tmpDescriptor.push({
          "name": currentDescriptor.name,
          "choice_selections": null
        })
      }

      tmpCumulative += DESCRIPTORS_DATA[i].descriptors.length
      this.cumulative_length.push(tmpCumulative)
    }

    this.profileData.profile.descriptors = tmpDescriptor
    this.list_descriptors = DESCRIPTORS_DATA
  }
}
</script>
