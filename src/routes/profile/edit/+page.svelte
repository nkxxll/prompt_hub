<script lang="ts">
  const { data } = $props();

  const profile = data.user;
</script>

<div class="flex flex-col items-center justify-center bg-black text-white">
  <div class="w-96 rounded-lg bg-gray-900 p-8 text-center shadow-lg">
    <h2 class="mb-4 text-xl font-semibold">Edit Profile</h2>

    <!-- Edit Form -->
    <form method="POST">
      <label for="username" class="mb-1 block text-left text-gray-400">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={profile.username}
        required
        class="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white focus:outline-none"
      />

      <div class="mt-4 flex justify-between">
        <!-- Save Button -->
        <button type="submit" class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">
          Save
        </button>

        <!-- Cancel Button (Back to Profile) -->
        <a href="/profile" class="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
          Cancel
        </a>
      </div>
    </form>
  </div>
</div>
