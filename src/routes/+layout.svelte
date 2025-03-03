<script lang="ts">
	import '../app.css';
  import { PUBLIC_APPLICATION_NAME } from "$env/static/public";

	let { data, children } = $props();
  const user = data.user;
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
  <!-- Header -->
  <header class="bg-gray-900 dark:bg-black text-white dark:text-gray-300 py-4 shadow-md border-b border-gray-800 dark:border-gray-700">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <h1 class="text-lg font-extrabold tracking-widest uppercase">{PUBLIC_APPLICATION_NAME}</h1>
      <nav class="space-x-6">
        <a href="/" class="hover:text-gray-400 transition-colors">Home</a>
        <a href="/create" class="hover:text-gray-400 transition-colors">Create</a>
        <a href="/about" class="hover:text-gray-400 transition-colors">About</a>
        <a href="/contact" class="hover:text-gray-400 transition-colors">Contact</a>
        {#if user}
          <a href="/profile" class="hover:text-gray-400 transition-colors">Profile</a>
        {:else}
          <a href="/login">Sign In</a>
        {/if}
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 container mx-auto px-4 py-8">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 dark:bg-black text-gray-500 dark:text-gray-400 py-4 border-t border-gray-800 dark:border-gray-700">
    <div class="container mx-auto px-4 text-center text-sm">
      &copy; 2025 {PUBLIC_APPLICATION_NAME}. All rights reserved.
    </div>
  </footer>
</div>

