<template>
  <div>
    <ul>
      <li v-for="(item, key) in images" :key="key">
        <img :src="item.img" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: {},
    }
  },
  mounted() {
    this.route = this.$route.params.id
    this.$gun
      .get(this.route)
      .get('gallery')
      .map()
      .once((node, key) => {
        this.images = {
          ...this.images,
          [key]: {
            ...node,
          },
        }
      })
  },
}
</script>
