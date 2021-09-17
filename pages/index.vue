<template>
  <div>
    <LogOut />
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
  mounted() {
    if (this.$gun.user().is) {
      this.$gun.user().recall({ sessionStorage: true })
      console.log('iniciado')
    } else {
      console.log('no iniciado')
    }
    // const user = this.$gun.user()
    // this.$gun.on('auth', async (ack) => {
    //   console.log(await user.get('alias'))
    // })
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
