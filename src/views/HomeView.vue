<template>
  <div class="home">
    You on inside home {{ message }}
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import $axios from "@/axios";

  export default defineComponent({
    name: "HomeView",
    setup() {
      const message = ref("");
      let user = {};
      const store = useStore();
      const router = useRouter();

      const logout = async () => {
        await $axios("user/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        localStorage.removeItem("token");
        window.location.reload();
      };

      onMounted(async () => {
        try {
          const response = await $axios("user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const user = response.data.data;
          message.value = `Hello, ${user.name}`;
        } catch (e) {
          console.error(e);
        }
      });

      if (localStorage.getItem("token")) {
        store.dispatch("setAuth", true);
      } else {
        store.dispatch("setAuth", false);
      }

      if (!store.state.authenticated) router.push("/login");

      return {
        logout,
        message,
      };
    },
  });
</script>
