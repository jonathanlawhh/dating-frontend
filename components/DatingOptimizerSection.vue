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

              <!--              COUNTRY -->
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
                                  v-model="profileData.profile.traveling"></v-checkbox>
                    </v-card-text>
                  </v-window-item>

                  <!--                  BIO -->
                  <v-window-item :value="2">
                    <v-card-text>
                      <v-textarea label="Bio" v-model="profileData.profile.bio" variant="outlined"
                                  placeholder="Here to have some fun..." no-resize></v-textarea>
                      <v-checkbox label="My spotify is connected to my account"
                                  v-model="profileData.profile.spotify"></v-checkbox>
                    </v-card-text>
                  </v-window-item>

                  <!--                  WORK/STUDY -->
                  <v-window-item :value="3">
                    <v-card-text>
                      <v-btn class="mr-2 mt-2 mb-2" :variant="flag_is_working ? 'flat' : 'tonal'"
                             @click="flag_is_working = true">
                        Working
                      </v-btn>
                      <v-btn class="ma-2" :variant="!flag_is_working ? 'flat' : 'tonal'"
                             @click="flag_is_working = false">Studying
                      </v-btn>

                      <v-text-field v-if="flag_is_working" label="I work at" placeholder="Some big 4"
                                    v-model="profileData.profile.job.company"
                                    variant="outlined"></v-text-field>
                      <v-text-field v-if="flag_is_working" label="My job title is" placeholder="Accountant..."
                                    v-model="profileData.profile.job.job_title"
                                    variant="outlined"></v-text-field>

                      <v-text-field v-if="!flag_is_working" label="I study at" placeholder="Harvard University"
                                    v-model="profileData.profile.school.name"
                                    variant="outlined"></v-text-field>
                    </v-card-text>
                  </v-window-item>

                  <!--                  INTERESTS -->
                  <v-window-item :value="4">
                    <v-card-text>
                      <v-chip-group column>
                        <v-chip v-for="(interest, i) in profileData.profile.interest" variant="tonal" :key="i"
                                :text="interest" @click="profileData.profile.interest.splice(i, 1)"
                                append-icon="mdi-close"></v-chip>
                      </v-chip-group>

                      <v-text-field label="Search" placeholder="Netflix" variant="outlined" @keyup="list_interest_filtered = list_interests.filter((il) => {
                        return il.name.toUpperCase().indexOf(ref_interest_search.toUpperCase()) > -1
                      })" v-model="ref_interest_search"></v-text-field>

                      <div style="max-height: 240px; overflow-y: scroll">
                        <v-chip-group column multiple>
                          <v-chip
                              v-for="(il, i) in list_interest_filtered"
                              @click="!profileData.profile.interest.includes(il.name) && profileData.profile.interest.push(il.name)"
                              variant="outlined"
                              :key="i"
                              :text="il.name"
                          ></v-chip>
                        </v-chip-group>
                      </div>

                    </v-card-text>
                  </v-window-item>

                  <!--                  DESCRIPTIONS -->
                  <v-window-item :value="5">
                    <v-card-text style="max-height: 480px; overflow-y: scroll">
                      <p style="font-size: 1.4rem" class="mb-4"></p>
                      <v-row>
                        <v-col cols="12" v-for="(d, di) in list_descriptors" :key="di">
                          <v-sheet elevation="4" class="pa-4">
                            <p style="font-size: 1.1rem" class="mb-2">{{ d.section_name }}</p>

                            <div v-for="(dn, dni) in d.descriptors" :key="dni">
                              <v-autocomplete
                                  v-if="dn.choices.length > 8"
                                  :label="dn.name"
                                  :items="dn.choices.map(a => a.name)"
                                  v-model="this.profileData.profile.descriptors[dni + (di > 0 ? ref_descriptors_cumulative_len[di - 1] : 0)].choice_selections"
                                  variant="outlined"
                                  :multiple="dn.type === 'multi_selection_set'"
                                  density="compact"
                              ></v-autocomplete>

                              <v-select
                                  v-if="dn.choices.length <= 8"
                                  :label="dn.name"
                                  :items="dn.choices.map(a => a.name)"
                                  v-model="this.profileData.profile.descriptors[dni + (di > 0 ? ref_descriptors_cumulative_len[di - 1] : 0)].choice_selections"
                                  variant="outlined"
                                  :multiple="dn.type === 'multi_selection_set'"
                                  density="compact"
                              ></v-select>
                            </div>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-window-item>

                  <!-- RESULTS -->
                  <v-window-item :value="6">
                    <v-card-text style="max-height: 480px; overflow-y: scroll">
                      <v-row>
                        <v-col cols="12" md="6" lg="8">
                          <div v-if="preCheckData.length > 0">
                            <p class="font-weight-medium">Some information maybe incomplete</p>
                            <p v-if="preCheckData.length > 2">**Please ensure at least {{ preCheckData.length - 2 }}
                              more is fixed</p>
                            <div v-for="(pc, i) in preCheckData" :key="i">
                              - {{ pc.prompt }}
                              <v-btn variant="tonal" @click="step = pc.page" size="small">Fix</v-btn>
                            </div>
                          </div>

                          <div v-if="preCheckData.length === 0">
                            <p class="font-weight-medium">All the required information is filled up</p>
                            <p>May you get more dates after optimizing!</p>
                          </div>
                        </v-col>

                        <v-col cols="12" md="6" lg="4">
                          <v-btn :disabled="flag_suggestions_loading || preCheckData.length > 2" color="primary"
                                 size="large" width="100%"
                                 @click="triggerGetSuggestions">
                            {{ flag_suggestions_loading ? 'Asking the AI...' : 'Get suggestions!' }}
                          </v-btn>
                        </v-col>
                      </v-row>

                      <!--                      SUGGESTIONS RESULT -->
                      <div v-if="Object.keys(suggestions).length > 0 && suggestions.suggestions.length > 0">
                        <v-row>
                          <v-col cols="12">
                            <p>---------------------------------------</p>
                            <p>
                              <span class="font-weight-bold">Common interest :</span>
                              {{ suggestions.common_dates_interest }}
                            </p>
                          </v-col>
                          <v-col cols="12" v-for="(s, i) in suggestions.suggestions" :key="i">
                            <v-card variant="flat" color="primary">
                              <v-card-text>
                                <p><span class="font-weight-bold">Current</span> : {{ s.current }}</p><br>
                                <p><span class="font-weight-bold">Bio proposal</span> : {{ s.example_for_bio }}</p><br>
                                <p><span class="font-weight-bold">Example</span> : {{ s.suggestion }}
                                </p><br>
                                <p><span class="font-weight-bold">Suggestion based on</span> :
                                  {{ s.example_from_potential_dates }}</p>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </div>

                    </v-card-text>
                  </v-window-item>
                </v-window>
              </v-col>

            </v-row>
          </v-card-item>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn v-if="step > 1 && !flag_suggestions_loading" variant="text" @click="preCheck(), step--"
                   prepend-icon="mdi-chevron-left">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="step < list_steps.length && !flag_suggestions_loading" color="primary" variant="flat"
                   @click="preCheck(), step++" append-icon="mdi-chevron-right">
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
import {getSuggestions} from "@/assets/logic.js";

export default {
  name: "DatingOptimizerCard",
  data: () => ({
    list_countries: ['MY', 'DE', 'JP', 'NL'],
    list_interests: [],
    list_interest_filtered: [],
    list_descriptors: [],
    ref_descriptors_cumulative_len: [],
    // Unused field disabled for now
    profileData: {
      country: 'MY',
      profile: {
        spotify: true,
        traveling: false,
        bio: '',
        // birth_date: '',
        interest: [],
        descriptors: [],
        job: {company: '', job_title: ''},
        school: {name: ''}
      }
    },
    cleanedProfile: {},
    step: 1,
    list_steps: ['Where are you from',
      'Tell me more about yourself, like your real Tinder profile.',
      'Are you a student or are you working?',
      'Interest as on your dating profile',
      'Common descriptors based on Tinder',
      'Get results'],
    ref_interest_search: '',
    flag_is_working: true,
    preCheckData: [],

    flag_suggestions_loading: false,
    suggestions: {}
  }),
  methods: {
    cleanProfile() {
      this.cleanedProfile = JSON.parse(JSON.stringify(this.profileData))

      let tmpCleanDescriptor = []
      for (let i = 0; i < this.profileData.profile.descriptors.length; i++) {
        let pdd = this.profileData.profile.descriptors[i]
        if (pdd.choice_selections) {
          tmpCleanDescriptor.push(pdd)
        }
      }

      this.cleanedProfile.profile.descriptors = tmpCleanDescriptor
    },
    preCheck() {
      this.cleanProfile()
      this.preCheckData = []

      function createPreMsg(prompt, pagenum) {
        return {
          'prompt': prompt,
          'page': pagenum
        }
      }

      this.cleanedProfile.profile.bio.length < 3 && this.preCheckData.push(createPreMsg('Bio does not seems complete', 2));
      (this.cleanedProfile.profile.job.job_title.length === 0 && this.cleanedProfile.profile.school.name.length === 0) && this.preCheckData.push(createPreMsg('No job or education', 3));
      this.cleanedProfile.profile.interest.length === 0 && this.preCheckData.push(createPreMsg('No interest selected', 4));
      this.cleanedProfile.profile.descriptors.length === 0 && this.preCheckData.push(createPreMsg('No descriptor selected', 5));
    },
    async triggerGetSuggestions() {
      this.flag_suggestions_loading = true
      await getSuggestions(this.cleanedProfile).then(r => r.json()).then((r) => {
        this.suggestions = r
      }).finally(() => {
        this.flag_suggestions_loading = false
      })
    }
  },
  mounted() {
    this.list_interests = INTERESTS_DATA
    this.list_interests.sort()
    this.list_interest_filtered = this.list_interests

    // Silly little hack to get the descriptors format nice and tidy
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
      this.ref_descriptors_cumulative_len.push(tmpCumulative)
    }

    this.profileData.profile.descriptors = tmpDescriptor
    this.list_descriptors = DESCRIPTORS_DATA
  }
}
</script>
