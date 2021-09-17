<template>
  <div>
    <button v-if="isLogged" @click="logOut()">cerrar sesion</button>
  </div>
</template>
<script>
export default {
  name: 'LogOut',
  data() {
    return {
      isLogged: false,
    }
  },
  mounted() {
    if (this.$gun.user().is) {
      this.isLogged = true
      console.log('iniciado')
    } else {
      console.log('no iniciado')
      this.isLogged = false
    }
  },
  methods: {
    logOut() {
      this.$gun.user().leave()
      if (this.$gun.user().is) {
        console.log('iniciado')
      } else {
        console.log('no iniciado')
        this.isLogged = false
      }
      //   this.$gun.user().recall({ sessionStorage: true })
      //   const user = this.$gun.user()
      //   this.$gun.on('auth', async (ack) => {
      //     console.log(await user.get('alias'))
      //   })
    },
  },
}
</script>
