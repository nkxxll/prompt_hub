<script lang="ts">
  import { onMount } from "svelte";

  const { data } = $props();
  type UserInputMap = {
    [key: string]: string;
  };

  let userInputs: UserInputMap = $state({}); // Stores user inputs for placeholders
  let copied: boolean = $state(false);

  function initializeInputs() {
    if (!data.pattern || !data.pattern.formatString) return;
    // Extract placeholders in the format $<placeholder>$
    const matches = [...data.pattern.formatString.matchAll(/\$\<(.*?)\>\$/g)];
    matches.forEach((match) => (userInputs[match[0].replace("$<", "").replace(">$", "")] = ""));
  }

  function formattedPrompt() {
    if (!data.pattern || !data.pattern.formatString) return;
    return data.pattern!.formatString.replace(
      /\$\<(.*?)\>\$/g,
      (_, key) => userInputs[key] || `$<${key}>$`,
    );
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(formattedPrompt() || "");
      copied = true;
      // TODO: increase usage count
    } catch (err) {
      console.error(err);
    }
  }

  onMount(initializeInputs);
</script>

{#if data.pattern}
  <section
    class="mx-auto max-w-7xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 dark:text-white"
  >
    <!-- Title -->
    <h1 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
      {data.pattern.name}
    </h1>

    <!-- Prompt Display -->
    <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">
      <strong class="font-medium">Prompt:</strong>
      {formattedPrompt()}
      <button
        onclick={copyToClipboard}
        class="flex items-center space-x-2 bg-black px-2 py-1 text-white transition duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        <span
          class={copied ? "font-semibold text-green-400" : "font-semibold text-white"}
          transition:opacity
        >
          {copied ? "Copied!" : "Copy?"}
        </span>
      </button>
    </p>

    <!-- LLM Website -->
    <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">
      <strong class="font-medium">LLM Website:</strong>
      <a
        href={data.pattern.llmWebsite}
        target="_blank"
        class="text-blue-500 hover:underline dark:text-blue-400"
      >
        {data.pattern!.llmWebsite}
      </a>
    </p>

    <!-- Fill in the placeholders -->
    <h3 class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
      Fill in the placeholders:
    </h3>
    <div class="mb-6 space-y-3">
      {#each Object.keys(userInputs) as key}
        <div class="flex flex-row">
          <label class="block font-medium text-gray-700 dark:text-gray-300" for={key}>{key}:</label>
          <input
            type="text"
            bind:value={userInputs[key]}
            id={key}
            class="ml-5 w-[100%] rounded-md border border-gray-300 p-0 text-black focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      {/each}
    </div>

    <!-- Additional Info -->
    <h2 class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Additional Info</h2>
    <ul class="list-none space-y-2 text-gray-700 dark:text-gray-300">
      <li><strong class="font-medium">Category:</strong> {data.pattern.category}</li>
      <li><strong class="font-medium">Usage Count:</strong> {data.pattern.usageCount}</li>
      <li><strong class="font-medium">Public:</strong> {data.pattern.public ? "Yes" : "No"}</li>
      <li><strong class="font-medium">Created At:</strong> {data.pattern.createdAt}</li>
      <li><strong class="font-medium">Updated At:</strong> {data.pattern.updatedAt}</li>
    </ul>
  </section>
{:else}
  pattern is undefined
{/if}
