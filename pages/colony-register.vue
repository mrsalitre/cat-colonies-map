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
        <div class="flex flex-wrap -mx-3 mt-4">
          <div class="w-full px-3">
            <label for="colony-name" class="text-lg font-semibold text-gray-800"
              >Nombre de colonia:</label
            >
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
              placeholder="ej. Aristogatos"
            />
          </div>
          <div class="w-full px-3">
            <label
              for="aprox-population"
              class="text-lg font-semibold text-gray-800"
              >Población aproximada:</label
            >
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
        <button
          v-show="!loadingImg"
          class="
            w-full
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            border border-transparent
            text-base
            leading-6
            font-medium
            rounded-md
            bg-gray-400
            hover:bg-gray-300 hover:text-gray-600
            focus:outline-none focus:shadow-outline
            transition
            duration-150
            ease-in-out
          "
          @click.prevent="pickFile()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="fill-current mr-2 h-5 w-5"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"
            />
          </svg>
          {{ newColony.img ? 'cambiar foto' : 'Hacer foto' }}
        </button>
        <p v-show="loadingImg">...cargando</p>
        <div class="w-full text-center mt-2">
          <button
            type="submit"
            :disabled="addingColony"
            class="
              w-full
              inline-flex
              items-center
              justify-center
              px-5
              py-3
              border border-transparent
              text-base
              leading-6
              font-medium
              rounded-md
              text-white
              bg-pink-400
              hover:bg-pink-300 hover:text-gray-600
              focus:outline-none focus:shadow-outline
              transition
              duration-150
              ease-in-out
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              class="fill-current mr-2 h-5 w-5"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <circle cx="4.5" cy="9.5" r="2.5" />
              <circle cx="9" cy="5.5" r="2.5" />
              <circle cx="15" cy="5.5" r="2.5" />
              <circle cx="19.5" cy="9.5" r="2.5" />
              <path
                d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
              />
            </svg>
            {{ addingColony ? 'Registrando...' : 'Registrar' }}
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
