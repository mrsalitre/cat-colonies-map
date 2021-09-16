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
  methods: {
    createNewUser() {
      const alias = this.user.alias
      let pass = this.user.password
      const trick = Date.now()
      pass = `${pass}_${trick}`
      console.log(pass.length)
      this.$gun.get(`~${alias}`).once((user) => {
        if (!user) {
          this.$gun.user().create(
            alias,
            pass,
            (ack) => {
              if (ack.ok) {
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
    authUser() {
      const alias = this.user.alias
      const pass = this.user.password
      this.$gun.user().auth(alias, pass, () => {
        console.log('usuario inicado')
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
