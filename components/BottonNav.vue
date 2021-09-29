<template>
  <div>
    <nav class="fixed bottom-0 w-full border bg-white flex overflow-x-auto">
      <nuxt-link
        to="/"
        exact
        class="
          p-2
          py-3
          flex flex-col flex-grow
          items-center
          justify-center
          overflow-hidden
          whitespace-no-wrap
          text-sm
          transition-colors
          duration-100
          ease-in-out
          hover:bg-gray-200
        "
      >
        <!-- <span :class="{ hidden: !isExactActive }">Inicio</span> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M23 11.1786L21.7524 12.5162L12 3.49261L2.24758 12.5025L1 11.1649L12 1L23 11.1786V11.1786ZM19.3333 12.7755L17.5 22H6.5L4.66667 12.7755L12 5.97883L19.3333 12.7755ZM12.9167 18.3478C12.9167 17.8438 12.506 17.4348 12 17.4348C11.494 17.4348 11.0833 17.8438 11.0833 18.3478C11.0833 18.8518 11.494 19.2609 12 19.2609C12.506 19.2609 12.9167 18.8518 12.9167 18.3478ZM13.8333 13.7826C13.8333 12.7737 13.012 11.9565 12 11.9565C10.988 11.9565 10.1667 12.7737 10.1667 13.7826C10.1667 14.7915 10.988 15.6087 12 15.6087C13.012 15.6087 13.8333 14.7915 13.8333 13.7826Z"
          />
        </svg>
      </nuxt-link>

      <nuxt-link
        to="/colony-register"
        class="
          p-2
          py-3
          flex flex-col flex-grow
          items-center
          justify-center
          overflow-hidden
          whitespace-no-wrap
          text-sm
          transition-colors
          duration-100
          ease-in-out
          hover:bg-gray-200
        "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="fill-current"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <circle cx="4.5" cy="9.5" r="2.5" />
          <circle cx="9" cy="5.5" r="2.5" />
          <circle cx="15" cy="5.5" r="2.5" />
          <circle cx="19.5" cy="9.5" r="2.5" />
          <path
            d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
          />
        </svg>
      </nuxt-link>

      <nuxt-link
        to="/user-profile"
        exact
        class="
          p-2
          py-3
          flex flex-col flex-grow
          items-center
          justify-center
          overflow-hidden
          whitespace-no-wrap
          text-sm
          transition-colors
          duration-100
          ease-in-out
          hover:bg-gray-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current"
        >
          <path
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
          />
        </svg>
      </nuxt-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'BottonNav',
}
</script>
<style lang="postcss" scoped>
a.nuxt-link-exact-active {
  @apply text-pink-400;
}
</style>
