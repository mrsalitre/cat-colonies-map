<template>
  <div class="flex flex-wrap max-h-screen content-center justify-center">
    <div class="w-full md:w-1/3 p-2 shadow bg-white">
      <div>
        <LogOut />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    const user = this.$gun.user()
    if (user.is) {
      await user.recall({ sessionStorage: true })
      console.log(user.is.pub)
      this.user = user.is
    } else {
      console.log('no iniciado')
      this.$router.push('/signin')
    }
  },
}
</script>
