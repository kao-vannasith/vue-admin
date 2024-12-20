<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="60"
      class="pa-4"
      src="../../public/15ffa6f1-9506-4d26-9136-fa90f1cf92f9.jpg"
    >
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, pathrouter] in links" :key="icon" link @click="$router.push({path: pathrouter})">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-microsoft-windows", "Dashboard" , "/"],
        ["mdi-account", "ຂໍ້ມູນຫລັກ", "Member"],
        ["mdi-card-account-details-outline", "ຂໍ້ມູນລູກຄ້າ", "Customer"],
        ["mdi-clipboard-list-outline", "ຄູ່ມືການໃຊ້ງານ", "Setting"],
        ["mdi-cog", "ອອກຈາກລະບົບ", "Overview"],
      ],
    };
  },
};
</script>

<style scoped></style>
