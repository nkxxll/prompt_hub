<script lang="ts">
  import { llmWebsites, promptCategories } from "$lib";
  const { data } = $props();
  const pattern = data.pattern!;

</script>

<form method="POST">
  <input type="hidden" name="id" value={pattern.id}/>
  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">
    Name
    <input
      type="text"
      name="name"
      value={pattern.name}
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      required
    />
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">
    Format String
    <textarea
      name="formatString"
      value={pattern.formatString}
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      rows="5"
      required
    ></textarea>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >LLM Website
    <input
      type="url"
      name="llmWebsite"
      value={pattern.llmWebsite}
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      list="urls"
    />
    <datalist id="urls">
      {#each llmWebsites as url}
        <option>{url}</option>
      {/each}
    </datalist>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Notes
    <textarea
      name="notes"
      value={pattern.notes}
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    ></textarea>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Category
    <select
      name="category"
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <option value={pattern.category} disabled>Select a Category</option>
      {#each promptCategories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Public
    <input type="checkbox" checked={pattern.public} class="rounded-md" name="public" />
  </label>

  <input type="hidden" value={pattern.userId} name="userId" />

  <button
    class="w-full rounded-md bg-blue-500 p-2 text-white shadow-md transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Save Changes
  </button>
</form>
