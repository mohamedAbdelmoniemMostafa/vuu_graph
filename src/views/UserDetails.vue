<script>
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

export default {
  setup () {
    const route = useRoute()
    const params = route.params
    const id = `id: ${params.id}`
    const form = ref({
      name: '',
      location: '',
      countries: [],
    })
    const {  result, loading, error } = useQuery(gql`
      query getUser {
        user(${id}) {
          id
          name
          email 
          description 
          countries{
            id
            name
          }
          profile{
            id
            name
            url
          }
        }
      }
    `)

    const { mutate: addBranch, onDone, onError, loading: loading2, error: error2 } =  useMutation(gql`
        mutation addBranch($name: String!, $location: String!, $countries: [String!]!) {
            storeBranch(name: $name, location: $location, countries: $countries) {
                id
                name
                location
                countries{
                id
                name
                }
            }
            }
        `)

        onDone(data => {
            console.log("data ",data)
        })
        onError(errors => {
            console.log("Error ",errors)
            // error = logErrorMessages(errors)
            error = errors
        })

   

    return {
      result,
      loading,
      error ,
      form,
      addBranch
    }
  }
}
</script>

<template>
  <div class="container mt-5">
    <span v-for="(error, i) of error?.graphQLErrors" :key="i">
        {{ error.message }}
    </span>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-else-if="result && result.user">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ result.user?.name }}</h5>
          <form @submit.prevent="addBranch(form)">
            <div class="mb-3">
                <label for="name" class="form-label">name</label>
                <input type="text" v-model="form.name" class="form-control" id="name" placeholder="name">
            </div>
            <div class="mb-3">
                <label for="countries" class="form-label">countries</label>
                <select class="form-select" multiple aria-label="countries" id="countries" v-model="form.countries">
                    <option selected>select countries</option>
                    <option v-for="country in result.user?.countries" :key="country.id" :value="country.id">{{ country.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">location</label>
                <input type="text" v-model="form.location" class="form-control" id="location" placeholder="location">
            </div>
            <div class="mb-5 col-auto">
                <button type="submit" class="btn btn-outline-primary mb-3" @click.prevent="addBranch(form)">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
   
  
</template>

<style>

</style>