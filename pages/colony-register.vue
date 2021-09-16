<template>
  <div>
    <client-only>
      <image-uploader
        ref="fileStoreUploader"
        :auto-rotate="true"
        :quality="0.7"
        :preview="false"
        style="display: none"
        capture="environment"
        output-format="string"
        @input="setImage"
        @onUpload="loadingImg = true"
        @onComplete="loadingImg = false"
      />
    </client-only>
    <input
      ref="fileUpload"
      style="display: none"
      type="file"
      @change="processFile($event)"
    />
    <img :src="newColony.img" />
    <button v-show="!loadingImg" @click.prevent="pickFile()">
      {{ newColony.img ? 'cambiar foto' : 'hacer foto' }}
    </button>
    <p v-show="loadingImg">...cargando</p>
    <form action="" @submit.prevent="addColony()">
      <input v-model="newColony.name" type="text" required />
      <input v-model.number="newColony.aproxPopulation" type="number" />
      <p v-show="gettingLocation">Consiguiendo ubicación...</p>
      <button type="submit">
        {{ addingColony ? 'registrando...' : 'registrar colonia' }}
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'RegsterColony',
  data() {
    return {
      colonyImg: undefined,
      loadingImg: false,
      gettingLocation: false,
      addingColony: false,
      newColony: {
        name: '',
        aproxPopulation: 0,
        img: undefined,
      },
      colonies: {},
    }
  },
  methods: {
    setImage(img) {
      this.newColony.img = img
    },
    processFile(e) {
      this.$refs.fileStoreUploader.uploadFile(e)
    },
    pickFile() {
      this.$refs.fileUpload.click()
    },
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
      const img = this.newColony.img
      const newColony = this.$gun.get(colonyName).put({
        name: colonyName,
        'aprox-population': aproxPopulation,
        img,
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
