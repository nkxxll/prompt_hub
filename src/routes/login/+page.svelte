<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<section class="flex">
  <div class="w-[40%] m-auto">
  <h1 class="text-4xl font-bold">Login/Register</h1>
  <form method="post" action="?/login" use:enhance class="mt-5">
    <div class="mt-5">
      <label class="mt-5 text-xl font-bold">
        Username
        <input
          name="username"
          class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>
    </div>
    <div class="mt-5">
      <label class="text-xl font-bold">
        Password
        <input
          type="password"
          name="password"
          class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </label>
    </div>
    <button class="border-width-[2px] border border-white px-2 py-1 font-bold">Login</button>
    <button
      formaction="?/register"
      class="border-width-[2px] ml-2 mt-5 border border-white px-2 py-1 font-bold">Register</button
    >
  </form>
  <p style="color: red">{form?.message ?? ""}</p>
  </div>
</section>
