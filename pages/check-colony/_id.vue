<template>
  <div class="flex flex-wrap max-h-screen content-center justify-center">
    <div class="w-full md:w-1/3 p-2 shadow bg-white">
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
        <img :src="colonyImg" />
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
          {{ colonyImg ? 'cambiar foto' : 'Hacer foto' }}
        </button>
        <p v-show="loadingImg">...cargando</p>
        <div class="w-full text-center mt-2">
          <button
            type="submit"
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
            @click="addColonyImg()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="fill-current mr-2 h-5 w-5"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"
              />
            </svg>
            {{ addingColonyImg ? 'Subiendo...' : 'Subir foto' }}
          </button>
        </div>
      </div>
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
      addingColonyImg: false,
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
      this.colonyImg = img
    },
    processFile(e) {
      this.$refs.fileStoreUploader.uploadFile(e)
    },
    pickFile() {
      this.$refs.fileUpload.click()
    },
    addColonyImg() {
      if (!this.colonyImg) return
      this.addingColonyImg = true
      const route = this.$route.params.id
      const img = this.colonyImg
      const takenByAlias = this.user.alias
      const takenByPub = this.user.pub
      const newColonyImg = this.$gun.get(`${route}-images`).set({
        img,
        takenByAlias,
        takenByPub,
      })
      this.$gun.get(route).get('gallery').set(newColonyImg)
      this.$gun.user().get('checked-colonies').set(newColonyImg)
      this.$router.push('/')
      this.addingColonyImg = false
    },
  },
}
</script>
