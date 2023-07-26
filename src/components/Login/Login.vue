<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344" title="Login">
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            prepend-inner-icon="mdi mdi-account-key"
            v-model="email"
            :readonly="loading"
            :rules="emailRules"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>
  
          <v-text-field
            prepend-inner-icon="mdi mdi-lock-outline"
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>
  
          <br />
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            @click="Login"
          >
            LOG IN
          </v-btn>
          <!-- <v-card-text class="text-center">
          <a
          @click="$router.push({ name: 'Register' })"
            class="text-blue text-decoration-none"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
          </v-card-text> -->
        </v-form>
      </v-card>
    </v-sheet>
  </template>
  
  <script>
  import axios from 'axios'
  
    export default {
      data: () => ({
        form: false,
        password: null,
        loading: false, 
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        
      }),
  
      methods: {
        Login (){
          axios.post('http://192.168.100.96:3000/api/login', {email:this.email, password:this.password})
          .then ((res)=>{
            if(res){
              this.$router.push({name:'home'})
            }
          })
        },
        onSubmit() {
          if (!this.form) return
  
          this.loading = true
  
          setTimeout(() => (this.loading = false), 2000)
        },
        required(v) {
          return !!v || 'Field is required'
        },
        
      },
    }
  </script>
  