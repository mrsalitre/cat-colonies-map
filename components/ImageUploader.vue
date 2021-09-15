<template>
  <client-only placeholder="Cargando...">
    <vue-image-uploader
      id="newStoreImageUpload"
      ref="fileStoreUploader"
      :auto-rotate="true"
      :quality="0.7"
      :preview="false"
      style="display: none"
      capture="environment"
      @input="setImage"
      @onUpload="loadingImg = true"
      @onComplete="loadingImg = false"
    />
    <input
      ref="fileUpload"
      style="display: none"
      class="cursor-pointer absolute block opacity-0 pin-r pin-t"
      type="file"
      @change="processFile($event)"
    />
    <img
      :src="colonyImg"
      class="
        inline-block
        object-cover
        w-16
        h-16
        md:w-32 md:h-32
        rounded-full
        shadow
      "
    />
    <br />
    <button v-show="!loadingImg" class="underline" @click.prevent="pickFile()">
      cambiar foto de producto
    </button>
    <p v-show="loadingImg">...cargando</p>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      loadingImg: false,
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
  },
}
</script>
