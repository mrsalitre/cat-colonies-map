<template>
  <div>
    <form action="" @submit.prevent="">
      <input v-model="user.name" type="email" required />
      <input v-model="user.password" type="password" required />
      <button>Iniciar sesión</button>
      <button type="submit" @click="createNewUser()">Registrarse</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: null,
        password: null,
      },
    }
  },
  methods: {
    createNewUser() {
      const userName = this.user.userName
      const userPass = this.user.password
      this.$gun.get(`~@${userName}`).once((user) => {
        if (!user) {
          this.$gun.user().create(userName, userPass, () => {
            console.log('usuario creado PUTO')
          })
        }
      })
    },
  },
}
</script>
