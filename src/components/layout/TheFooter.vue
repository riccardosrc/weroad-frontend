<template>
  <v-footer color="primary">
    <v-row justify="center" no-gutters>
      <v-btn color="white" variant="text" to="/login"> Restricted Area </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>WeRoad</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
footer {
  max-height: 6rem;
}
</style>
