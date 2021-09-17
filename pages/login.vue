<template>
  <div>
    <input v-model="user.alias" type="email" />
    <input v-model="user.password" type="password" />
    <button @click="authUser()">Iniciar sesión</button>
    <button @click="createNewUser()">Registrarse</button>
    <button @click="checkUser()">check user</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        alias: '',
        password: '',
      },
    }
  },
  async mounted() {
    await this.$gun.user().recall({ sessionStorage: true })
  },
  methods: {
    async createNewUser() {
      const alias = this.user.alias
      const pass = this.user.password
      await this.$gun.get(`~@${alias}`).once((user) => {
        if (!user) {
          this.$gun.user().create(
            alias,
            pass,
            (ack) => {
              if (ack.ok === 0) {
                console.log('usuario creado')
              } else {
                console.log(ack.err)
              }
            },
            {}
          )
        }
      })
    },
    async authUser() {
      const alias = this.user.alias
      const pass = this.user.password
      await this.$gun.user().auth(alias, pass, () => {
        console.log('usuario iniciado')
      })
    },
    checkUser() {
      if (this.$gun.user().is) {
        console.log('iniciado')
      } else {
        console.log('no iniciado')
      }
    },
  },
}
</script>
