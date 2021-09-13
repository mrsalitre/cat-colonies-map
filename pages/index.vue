<template>
  <div>
    <form @click.prevent="addColony()">
      <input v-model="newColony.name" type="text" />
      <input v-model.number="newColony.aproxPopulation" type="text" />
      <button type="submit">crear colonia</button>
    </form>
    <ul>
      <li v-for="(colony, key) in colonies" :key="key">
        <pre>{{ colony }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newColony: {
        name: '',
        aproxPopulation: 0,
      },
      colonies: {},
    }
  },
  mounted() {
    this.$gun
      .get('cat-colonies')
      .map()
      .on((node, key) => {
        if (node !== null) {
          this.colonies = {
            ...this.colonies,
            [key]: { ...node },
          }
        }
      })
  },
  methods: {
    addColony() {
      const colonyName = this.newColony.name
      const aproxPopulation = this.newColony.aproxPopulation
      const newColony = this.$gun.get(colonyName).put({
        name: colonyName,
        'aprox-population': aproxPopulation,
      })
      this.$gun.get('cat-colonies').set(newColony)
    },
  },
}
</script>
