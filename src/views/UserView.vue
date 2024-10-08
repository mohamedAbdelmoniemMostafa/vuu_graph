<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { defineComponent } from 'vue'


export default {
  setup () {
    const {  result, loading, error } = useQuery(gql`
      query getUsers {
        users {
          id
          name
          email 
          description 
          profile{
            id
            name
            url
          }
        }
      }
    `)

    return {
      result,
      loading,
      error 
    }
  }
}
</script>

<template>
  <div class="container mt-5">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="result && result.users" class="row ">
      <div class="card col-md-3 mb-3 mx-2" v-for="user of result.users" :key="user?.id">
        <img :src="user?.profile?.url" class="card-img-top" :alt="user.profile?.name">
        <div class="card-body">
          <h5 class="card-title">{{ user?.name }}</h5>
          <p class="card-text">{{ user?.details }}</p>
          <router-link :to="`/user/${user?.id}`" class="btn btn-outline-primary card-link center">Details</router-link>
        </div>
      </div>
    </div>
  </div>
   
  
</template>

<style>

</style>