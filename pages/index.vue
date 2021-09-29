<template>
  <div>
    <div class="lg:container lg:mx-auto lg:max-w-2xl">
      <ul>
        <li v-for="(colony, key) in colonies" :key="key">
          <ColonyCard
            :colony-key="key"
            :colony-name="colony.name"
            :colony-img="colony.img"
            :colony-location="colony.location"
            :aprox-population="colony['aprox-population']"
            :created-by-alias="colony.createdByAlias || 'desconocido'"
          />
        </li>
      </ul>
    </div>
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
