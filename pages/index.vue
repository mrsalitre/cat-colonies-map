<template>
  <div>
    <ul>
      <li v-for="(colony, key) in colonies" :key="key">
        <pre>{{ colony.name }}</pre>
        <img :src="colony.img" :alt="`imagen de ${colony.name}`" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
}
</script>
