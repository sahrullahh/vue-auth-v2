<template>
  <div class="flex justify-center">
    <div class="container max-auto max-w-2xl">
      <div
        class="bg-white shadow w-full rounded-lg border mt-[10vh] p-10 pb-14 space-y-7"
      >
        <div class="head space-y-2">
          <h2
            class="text-3xl font-bold font-plus-jakarta-sans tracking-tighter"
          >
            Login
          </h2>
          <p class="font-semibold text-neutral-400 font-plus-jakarta-sans">
            Welcome, log in to your account before continue
          </p>
        </div>
        <form
          @submit.prevent="handleLogin"
          class="space-y-5"
        >
          <div class="form-input">
            <label for="email_input">
              Email <span class="ml-2 text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email_input"
              :class="
                errors.email
                  ? 'border-red-500 ring-red-500 text-red-500 focus:text-red-500'
                  : ''
              "
              class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 ring-0"
              v-model="form.email"
            />
            <p
              v-if="errors.email"
              class="text-red-500"
            >
              {{ errors.email }}
            </p>
          </div>
          <div class="form-input">
            <label for="password_input">
              Password <span class="ml-2 text-red-500">*</span>
            </label>
            <div class="password_inputed">
              <input
                :type="!passwordVisible ? 'password' : 'text'"
                id="password_input"
                :class="
                  errors.password || passwordLimit
                    ? 'border-red-500 ring-red-500 text-red-500 focus:text-red-500'
                    : ''
                "
                class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 focus:text-blue-500 ring-0"
                v-model="form.password"
              />
              <button
                type="button"
                v-if="!passwordVisible"
                @click="passwordVisible = true"
                class="absolute right-3 mt-[4px] text-2xl text-neutral-500"
              >
                <i class="bi bi-eye-slash"></i>
              </button>
              <button
                type="button"
                v-else
                @click="passwordVisible = false"
                class="absolute right-3 mt-[4px] text-2xl text-neutral-500"
              >
                <i class="bi bi-eye"></i>
              </button>
            </div>
            <p
              v-if="errors.password || passwordLimit"
              class="text-red-500"
            >
              {{
                !errors.password
                  ? "password must be used 8 characters"
                  : errors.password
              }}
            </p>
          </div>
          <button
            class="btn w-full bg-blue-500 text-white font-semibold shadow-blue-500 drop-shadow-md text-lg focus:ring-4 ring-blue-400"
          >
            Login to continue
          </button>
          <p class="text-center">
            Don't have an account?
            <router-link
              to="/register"
              class="text-blue-500 font-plus-jakarta-sans font-semibold"
              >Register</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { validateLogin } from "@/utils/validate";
  import { useStore } from "vuex";
  import $axios from "@/axios";

  export default defineComponent({
    name: "Login",
    setup() {
      const store = useStore();
      let passwordVisible = ref<boolean>(false);

      interface Users {
        email: string;
        password: string;
      }

      const form: Users = {
        email: "",
        password: "",
      };

      return {
        passwordVisible,
        form,
        store,
      };
    },
    components: {},
    data() {
      return {
        errors: {},
        passwordMatch: false,
        passwordLimit: false,
      };
    },
    methods: {
      async handleLogin() {
        const { isInvalid, errors }: any = validateLogin(this.form);

        if (this.form.password.length < 8) {
          this.passwordLimit = true;
        } else {
          this.passwordLimit = false;
        }

        if (isInvalid) {
          this.errors = errors;
        } else {
          this.errors = {};

          const data = {
            email: this.form.email,
            password: this.form.password,
          };

          try {
            const response = await $axios("user/login", {
              method: "POST",
              data: JSON.stringify(data),
            });
            const { token } = response.data;

            localStorage.setItem("token", token);

            this.$router.push("/");
          } catch (e) {
            console.error(e);
          }
        }
      },
    },
    mounted() {
      this.form.email = `${!this.$route.query ? "" : this.$route.query.email}`;
    },
  });
</script>
