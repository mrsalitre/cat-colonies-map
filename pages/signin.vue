<template>
  <div class="flex flex-wrap max-h-screen content-center justify-center">
    <div class="w-auto md:w-1/3 p-2 shadow bg-white">
      <form class="w-full" @submit.prevent="signIn">
        <h3 class="font-bold mb-4 lg:text-center boicotea-gradient text-4xl">
          Iniciar sesion
        </h3>
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <label for="loginEmail" class="invisible">Nombre de usuario</label>
            <input
              id="loginEmail"
              v-model.trim="username"
              type="text"
              required
              class="
                appearance-none
                block
                w-full
                bg-grey-lighter
                text-grey-darker
                border border-red
                rounded
                py-3
                px-1
                mb-3
                lg:text-center
              "
              placeholder="Nombre de usuario"
            />
            <p
              v-if="errors.username.length"
              class="text-sm lg:text-center text-bold text-red-600 -mt-3"
            >
              <span v-for="error in errors.username" :key="error">{{
                error
              }}</span>
            </p>
          </div>
          <div class="w-full px-3">
            <input
              id="loginPassword"
              v-model="password"
              class="
                appearance-none
                block
                w-full
                bg-grey-lighter
                text-grey-darker
                border border-red
                rounded
                py-3
                px-1
                mb-3
                lg:text-center
              "
              type="password"
              placeholder="Contraseña"
              required
            />
            <p
              v-if="errors.password.length"
              class="text-sm lg:text-center text-bold text-red-600 -mt-3"
            >
              <span v-for="error in errors.password" :key="error">{{
                error
              }}</span>
            </p>
            <label for="loginPassword" class="invisible"
              >Contraseña de inicio de sesión</label
            >
          </div>
        </div>
        <div class="w-full text-center mt-2">
          <button
            type="submit"
            :disabled="authenticating"
            class="
              w-full
              lg:w-auto
              rounded-full
              py-2
              px-6
              shadow
              font-semibold
              text-xl
              boicotea-gradient-bg
              hover:to-purple-600 hover:from-blue-500
            "
          >
            {{ !authenticating ? 'Entrar' : 'Entrando...' }}
          </button>
          <p class="pt-2 text-gray-700">¿No tienes una cuenta?</p>
          <nuxt-link
            to="/signup"
            class="text-gray-600 hover:text-gray-900 underline pb-2"
            >Registrarse</nuxt-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignUp',
  data() {
    return {
      username: null,
      password: null,
      authenticating: false,
      errors: {
        username: [],
        password: [],
      },
    }
  },
  computed: {
    errorsDisplay() {
      return this.errors.username.length > 0 || this.errors.password.length > 0
    },
  },
  methods: {
    authenticateUser() {
      return new Promise((resolve, reject) => {
        this.$gun.user().auth(
          this.username,
          this.password,
          (ack) => {
            if (ack.ack === 2) {
              resolve({ error: false })
            } else {
              resolve({ error: ack.err })
            }
          },
          {}
        )
      })
    },
    async signIn() {
      try {
        this.authenticating = true
        await this.validateForm()
        const response = await this.authenticateUser()
        if (!response.error) {
          const user = this.$gun.user()
          await user.recall({ sessionStorage: true })
          this.$router.push('/')
        } else if (response.error === 'Wrong user or password.') {
          this.errors.password.push('La contraseña no es correcta')
          this.errors.username.push('El usuario no es correcto')
        }
        this.authenticating = false
      } catch (e) {
        this.handleError(e)
        this.authenticating = false
      }
    },
    handleError(error) {
      // eslint-disable-next-line no-console
      console.log(error)
    },
    validateForm() {
      this.errors.username = []
      this.errors.password = []
      const usernamePttr = /^[a-zA-Z0-9._]+$/
      const username = this.username.trim().toLowerCase()
      const password = this.password
      if (!username) {
        this.errors.username.push('Por favor, escriba un nombre de usuario.')
      } else if (!usernamePttr.test(username)) {
        this.errors.username.push(
          'Por favor escriba un nombre de usuario válido'
        )
      }
      if (!password) {
        this.errors.password.push('Por favor introduzca una contraseña')
      } else if (password.length < 8) {
        this.errors.password.push(
          'La contraseña debe tener al menos 8 caracteres.'
        )
      }
      if (!this.errorsDisplay) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
