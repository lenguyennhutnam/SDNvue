<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="inputData" label="Input Data"></v-text-field>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      inputData: "",
    };
  },
  methods: {
    submitForm() {
      // Store the values in variables or perform any other action here
      const storedName = this.name;
      const storedEmail = this.email;
      const storedValue = this.inputData;
      console.log("Stored Name: ", storedName);
      console.log("Stored Email: ", storedEmail);
      console.log("Stored Value: ", storedValue);
    },
  },
};
</script>
