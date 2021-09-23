<template>
  <div>
    <LogOut />
    <nuxt-link to="/colony-register">registrar colonia</nuxt-link>
    <ul>
      <li v-for="(colony, key) in colonies" :key="key">
        <img :src="colony.img" :alt="`imagen de ${colony.name}`" />
        <nuxt-link :to="`/check-colony/${key}`">comprobar colonia</nuxt-link>
        <nuxt-link :to="`/colony-gallery/${key}`">ver fotos</nuxt-link>
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
  async mounted() {
    const user = this.$gun.user()
    if (user.is) {
      await user.recall({ sessionStorage: true })
      console.log(user.is.pub)
    } else {
      console.log('no iniciado')
    }
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
