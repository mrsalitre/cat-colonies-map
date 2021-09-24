<template>
  <div class="flex flex-wrap max-h-screen content-center justify-center">
    <div class="w-auto md:w-1/3 p-2 shadow bg-white">
      <form action="" @submit.prevent="addColony()">
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
        <button
          v-show="!loadingImg"
          class="h-32 w-full bg-gray-200"
          @click.prevent="pickFile()"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              class="fill-current"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"
              />
            </svg>
            {{ newColony.img ? 'cambiar foto' : 'hacer foto' }}
          </span>
        </button>
        <p v-show="loadingImg">...cargando</p>
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <label for="colony-name">Nombre de colonia</label>
            <input
              id="colony-name"
              v-model.trim="newColony.name"
              type="text"
              required
              class="
                appearance-none
                block
                w-full
                bg-grey-lighter
                text-grey-darker
                border border-red
                rounded
                py-3
                px-1
                mb-3
                lg:text-center
              "
              placeholder="Aristogatos"
            />
          </div>
          <div class="w-full px-3">
            <label for="aprox-population">Población aproximada</label>
            <input
              id="aprox-population"
              v-model.number="newColony.aproxPopulation"
              class="
                appearance-none
                block
                w-full
                bg-grey-lighter
                text-grey-darker
                border border-red
                rounded
                py-3
                px-1
                mb-3
                lg:text-center
              "
              type="number"
              placeholder="Población aproximada"
              required
            />
          </div>
        </div>
        <div class="w-full text-center mt-2">
          <button
            type="submit"
            :disabled="addingColony"
            class="
              w-full
              lg:w-auto
              rounded-md
              py-2
              px-6
              shadow
              font-semibold
              text-xl
              boicotea-gradient-bg
              hover:to-purple-600 hover:from-blue-500
            "
          >
            {{ addingColony ? 'registrando...' : 'registrar' }}
          </button>
          <p v-show="gettingLocation">Consiguiendo ubicación...</p>
        </div>
        <!-- <input v-model="newColony.name" type="text" required />
        <input v-model.number="newColony.aproxPopulation" type="number" />
        <button type="submit">
          {{ addingColony ? 'registrando...' : 'registrar colonia' }}
        </button> -->
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegsterColony',
  data() {
    return {
      user: null,
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
  async mounted() {
    const user = this.$gun.user()
    if (user.is) {
      await user.recall({ sessionStorage: true })
      console.log(user.is.pub)
      this.user = user.is
    } else {
      console.log('no iniciado')
      this.$router.push('/signin')
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
      const createdByAlias = this.user.alias
      const createdByPub = this.user.pub
      const newColony = this.$gun.get(colonyName).put({
        name: colonyName,
        'aprox-population': aproxPopulation,
        img,
        createdByAlias,
        createdByPub,
        location: {
          lat,
          long,
        },
      })
      this.$gun.get('cat-colonies').set(newColony)
      this.$gun.user().get('registered-colonies').set(newColony)
      this.addingColony = false
    },
  },
}
</script>
