<template>
  <div class="flex flex-col justify-between h-full mb-4 rounded-md shadow">
    <div class="relative overflow-hidden">
      <p
        class="
          absolute
          w-full
          py-2
          pl-2
          top-0
          inset-x-0
          bg-gray-100
          text-xs text-gray-700
          leading-4
        "
      >
        Registrado por: <span class="font-semibold">{{ createdByAlias }}</span>
      </p>
      <img
        loading="lazy"
        class="object-cover h-full w-full rounded-t-md"
        :src="colonyImg"
        :alt="`imagen de ${colonyName}`"
      />
      <nuxt-link
        :to="`/colony-gallery/${colonyKey}`"
        class="
          absolute
          underline
          w-full
          py-2
          pr-2
          top-0
          inset-x-0
          text-right text-xs text-gray-700
          leading-4
        "
      >
        ver galería
      </nuxt-link>
      <div
        class="
          absolute
          w-full
          py-2
          pl-2
          bottom-0
          inset-x-0
          bg-transparent
          text-white text-xl
          leading-4
        "
      >
        <p class="font-black pb-2">{{ colonyName }}</p>
        <p class="text-xs">Población Aprox: {{ aproxPopulation }}</p>
      </div>
    </div>
    <div class="py-4 px-2 sm:flex sm:justify-between">
      <div class="w-full sm:w-auto inline-flex">
        <a
          target="blank"
          :href="`https://www.google.com/maps/search/?api=1&query=${colonyLocation.lat}%2C${colonyLocation.long}`"
          class="
            w-full
            underline
            inline-flex
            items-center
            justify-center
            border border-transparent
            text-base
            leading-6
            font-medium
            text-gray-800
            hover:text-gray-600
            focus:outline-none focus:shadow-outline
            transition
            duration-150
            ease-in-out
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            class="pr-1 fill-current"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"
            />
          </svg>
          Visitar colonia
        </a>
      </div>
      <div class="w-full mt-3 sm:mt-0 sm:w-auto inline-flex rounded-md shadow">
        <nuxt-link
          :to="`/check-colony/${colonyKey}`"
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
            bg-pink-400
            hover:bg-pink-300 hover:text-gray-600
            focus:outline-none focus:shadow-outline
            transition
            duration-150
            ease-in-out
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            class="pr-1 fill-current"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"
            />
          </svg>
          Comprobar colonia
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ColonyCard',
  props: {
    colonyKey: String,
    colonyName: String,
    colonyImg: String,
    colonyLocation: Object,
    aproxPopulation: Number,
    createdByAlias: String,
  },
}
</script>
