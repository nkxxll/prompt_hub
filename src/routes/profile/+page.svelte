<script lang="ts">
  import { goto } from "$app/navigation";

  const { data } = $props();
  const username = data.user.username;
  const userId = data.user.id;

  const deleteAccount = async () => {
    const res = await fetch(`/api/profile/delete/${userId}`);
    if (res.status !== 200) {
      alert("handle this error you handsome man");
    }
    goto("/login");
  };
  const startEditing = () => {
    goto(`/profile/edit/`);
  };
</script>

<div class="flex flex-col items-center justify-center bg-black text-white">
  <div class="w-[40%] border border-width-[2px] border-white bg-black p-8 text-center shadow-lg">
    <!-- Avatar Placeholder -->
    <div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-700">
      <span class="text-sm text-gray-400">Avatar</span>
      <!-- Placeholder text -->
    </div>

    <!-- Username -->
    <div class="mb-4">
      <p class="text-lg font-semibold">{username}</p>
      <button
        class="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        onclick={startEditing}
      >
        Edit
      </button>
    </div>

    <!-- Delete Account -->
    <button
      class="flex-auto mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      onclick={deleteAccount}
    >
      Delete Account
    </button>
  </div>
</div>
