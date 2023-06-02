<template>
  <div class="flex justify-center">
    <div class="container max-auto max-w-2xl">
      <div
        class="bg-white shadow w-full rounded-lg border mt-[10vh] p-10 space-y-7"
      >
        <div class="head space-y-2">
          <h2
            class="text-3xl font-bold font-plus-jakarta-sans tracking-tighter"
          >
            Register
          </h2>
          <p class="font-semibold text-neutral-400 font-plus-jakarta-sans">
            Create an account before continue sign in.
          </p>
        </div>
        <div
          class="alert"
          v-if="emailExist"
        >
          <p>This email is already in use</p>
        </div>
        <form
          @submit.prevent="handleRegister"
          class="space-y-5"
        >
          <div class="form-input">
            <label for="email_input">
              Username <span class="ml-2 text-red-500">*</span>
            </label>
            <input
              type="name"
              id="username_input"
              class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 ring-0"
              v-model="form.name"
              :class="
                errors.name
                  ? 'border-red-500 ring-red-500 text-red-500 focus:text-red-500'
                  : ''
              "
            />
            <p
              v-if="errors.name"
              class="text-red-500"
            >
              {{ errors.name }}
            </p>
          </div>
          <div class="form-input">
            <label for="email_input">
              Email <span class="ml-2 text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email_input"
              class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 ring-0"
              v-model="form.email"
              :class="
                errors.email
                  ? 'border-red-500 ring-red-500 text-red-500 focus:text-red-500'
                  : ''
              "
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
                class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 focus:text-blue-500 ring-0"
                v-model="form.password"
                :class="
                  errors.password || passwordLimit
                    ? 'border-red-500 ring-red-500 text-red-500 focus:text-red-500'
                    : ''
                "
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
          <div class="form-input">
            <label for="confirm_password_input">
              Confirm Password <span class="ml-2 text-red-500">*</span>
            </label>
            <div class="password_inputed">
              <input
                :type="!passwordConfirmVisible ? 'password' : 'text'"
                id="confirm_password_input"
                v-model="form.confirmPassword"
                class="w-full p-2 rounded-md border focus:ring-2 outline-none ring-blue-500 focus:text-blue-500 ring-0"
                :class="
                  errors.confirmPassword || passwordMatch
                    ? 'border-red-500 ring-red-500 focus:text-red-500 text-red-500'
                    : ''
                "
              />
              <button
                type="button"
                v-if="!passwordConfirmVisible"
                @click="passwordConfirmVisible = true"
                class="absolute right-3 mt-[4px] text-2xl text-neutral-500"
              >
                <i class="bi bi-eye-slash"></i>
              </button>
              <button
                type="button"
                v-else
                @click="passwordConfirmVisible = false"
                class="absolute right-3 mt-[4px] text-2xl text-neutral-500"
              >
                <i class="bi bi-eye"></i>
              </button>
            </div>
            <p
              v-if="errors.confirmPassword || passwordMatch"
              class="text-red-500 ring-red-500 focus:text-red-500"
            >
              {{
                !errors.confirmPassword
                  ? "Password doesn`t match!"
                  : errors.confirmPassword
              }}
            </p>
          </div>
          <button
            type="submit"
            class="btn w-full bg-green-500 text-white font-semibold shadow-green-500 drop-shadow-md text-lg focus:ring-4 ring-green-400"
          >
            Create account
          </button>
          <p class="text-center">
            Already have an account?
            <router-link
              to="/login"
              class="text-blue-500 font-plus-jakarta-sans font-semibold"
              >Login</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import type { Ref } from "vue";
  import { validateRegister } from "@/utils/validate";
  import { useRouter } from "vue-router";
  import $axios from "@/axios";

  export default defineComponent({
    name: "Register",
    setup() {
      let passwordVisible = ref<boolean>(false);
      let passwordConfirmVisible = ref<boolean>(false);

      interface Users {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      }

      const form: Users = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      return {
        passwordVisible,
        passwordConfirmVisible,
        form,
      };
    },
    components: {},
    data() {
      return {
        errors: {},
        passwordMatch: false,
        passwordLimit: false,
        emailExist: false,
      };
    },
    methods: {
      async handleRegister() {
        const { isInvalid, errors }: any = validateRegister(this.form);

        if (this.form.confirmPassword != this.form.password) {
          this.passwordMatch = true;
        } else {
          this.passwordMatch = false;
        }

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
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
          };

          try {
            const response = await $axios("user/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify(data),
            });

            if (response.status == 409) {
              this.emailExist = true;
            } else {
              this.emailExist = false;
            }
            this.$router.push("/login?email=" + this.form.email);
          } catch (e) {
            console.error(e);
          }
        }
      },
    },
    mounted() {},
  });
</script>

<style></style>
