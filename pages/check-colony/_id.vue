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
    <img :src="colonyImg" />
    <button v-show="!loadingImg" @click.prevent="pickFile()">
      {{ colonyImg ? 'cambiar foto' : 'hacer foto' }}
    </button>
    <p v-show="loadingImg">...cargando</p>
    <form action="" @submit.prevent="addColonyImg()">
      <button type="submit">
        {{ addingColonyImg ? 'subiendo...' : 'subir foto' }}
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
      addingColonyImg: false,
    }
  },
  async mounted() {
    const user = this.$gun.user()
    if (user.is) {
      await user.recall({ sessionStorage: true })
      console.log(user.is.pub)
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
      this.addingColonyImg = true
      const route = this.$route.params.id
      const img = this.colonyImg
      const newColonyImg = this.$gun.get(`${route}-images`).set({
        img,
      })
      this.$gun.get(route).get('gallery').set(newColonyImg)
      this.addingColonyImg = false
    },
  },
}
</script>
