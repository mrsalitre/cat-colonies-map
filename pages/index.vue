<template>
  <div>
    <form action="" @submit.prevent="addColony()">
      <input v-model="newColony.name" type="text" required />
      <input v-model.number="newColony.aproxPopulation" type="number" />
      <button type="submit">
        {{ addingColony ? 'registrando...' : 'registrar colonia' }}
      </button>
    </form>
    <p v-show="gettingLocation">Consiguiendo ubicación...</p>
    <ul>
      <li v-for="(colony, key) in colonies" :key="key">
        <pre>{{ colony.name }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gettingLocation: false,
      addingColony: false,
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
          if (node.location) {
            this.$gun.get(`${key}/location`).once(
              (location) =>
                (this.colonies = {
                  ...this.colonies,
                  [key]: {
                    ...node,
                    location,
                  },
                })
            )
          }
        }
      })
  },
  methods: {
    getGeolocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocalización no disponible.'))
        }

        this.gettingLocation = true

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.gettingLocation = false
            resolve(pos)
          },
          (err) => {
            this.gettingLocation = false
            reject(err)
          }
        )
      })
    },
    async addColony() {
      this.addingColony = true
      const pos = await this.getGeolocation()
      const lat = pos.coords.latitude
      const long = pos.coords.longitude
      const colonyName = this.newColony.name
      const aproxPopulation = this.newColony.aproxPopulation
      const newColony = this.$gun.get(colonyName).put({
        name: colonyName,
        'aprox-population': aproxPopulation,
        location: {
          lat,
          long,
        },
      })
      this.$gun.get('cat-colonies').set(newColony)
      this.addingColony = false
    },
  },
}
</script>
