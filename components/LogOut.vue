<template>
  <div class="w-full text-center mt-2">
    <button
      v-if="isLogged"
      class="
        w-full
        inline-flex
        items-center
        justify-center
        px-5
        py-3
        border border-transparent
        text-base
        leading-6
        font-medium
        rounded-md
        text-white
        bg-red-400
        hover:bg-red-300 hover:text-gray-600
        focus:outline-none focus:shadow-outline
        transition
        duration-150
        ease-in-out
      "
      @click="logOut()"
    >
      Cerrar sesion
    </button>
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
    const user = this.$gun.user()
    if (user.is) {
      console.log(user.is.pub)
      this.isLogged = true
    } else {
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
        this.$router.push('/signin')
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
