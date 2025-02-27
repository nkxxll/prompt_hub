<script lang="ts">
  import { mostCommonWebsites } from "$lib";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  const { data } = $props();
  const pattern = data.pattern!;
  type UserInputMap = {
    [key: string]: string;
  };

  let userInputs: UserInputMap = $state({}); // Stores user inputs for placeholders
  let copied: boolean = $state(false);

  function initializeInputs() {
    if (!pattern || !pattern.formatString) return;
    // Extract placeholders in the format $<placeholder>$
    const matches = [...pattern.formatString.matchAll(/\$\<(.*?)\>\$/g)];
    matches.forEach((match) => (userInputs[match[0].replace("$<", "").replace(">$", "")] = ""));
  }

  function formattedPrompt() {
    if (!pattern || !pattern.formatString) return;
    return pattern!.formatString.replace(
      /\$\<(.*?)\>\$/g,
      (_, key) => userInputs[key] || `$<${key}>$`,
    );
  }

  async function copyToClipboard() {
    try {
      fetch(`/api/promptPatterns/incUsage/${pattern.id}`, { method: "PATCH" });
      await navigator.clipboard.writeText(formattedPrompt() || "");
      copied = true;
      // TODO: increase usage count
    } catch (err) {
      console.error(err);
    }
  }

  async function clickNGo(url: string) {
    copyToClipboard();
    window.open(url, "_blank")!.focus();
  }

  const edit = (id: number) => {
    return () => {
      goto(`/edit/${id.toString()}`);
    };
  };

  const delete_ = (id: number) => {
    return async () => {
      await fetch(`/api/promptPatterns/delete/${id}`, { method: "DELETE" }).then(
        (res: Response) => {
          if (res.status === 200) {
            goto("/");
            return;
          }
          console.error(`There was an error deleting this item ${pattern}. Response: ${res}`);
        },
      );
    };
  };

  onMount(initializeInputs);
</script>

{#if pattern}
  <section class="relative mx-auto max-w-7xl bg-white p-6 shadow-md dark:bg-black dark:text-white">
    <button
      class="border-width-[2px] absolute right-0 top-0 border border-white px-2 py-1"
      onclick={delete_(pattern.id)}
    >
      delete
    </button>
    <button
      class="border-width-[2px] absolute right-20 top-0 border border-white px-2 py-1"
      onclick={edit(pattern.id)}
    >
      edit
    </button>
    <!-- Title -->
    <h1 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
      {pattern.name}
    </h1>

    <!-- Prompt Display -->
    <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">
      <strong class="font-medium">Prompt:</strong>
      {formattedPrompt()}
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
            class="ml-5 w-[100%] rounded-md border border-gray-300 px-2 py-0 text-black focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      {/each}
    </div>

    <button
      onclick={copyToClipboard}
      class="boder-width-[2px] mb-4 flex items-center space-x-2 border border-white bg-white px-2 py-1 transition duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-black dark:text-white dark:hover:bg-gray-800"
    >
      <span
        class={copied ? "font-semibold text-green-400" : "font-semibold text-white"}
        transition:opacity
      >
        {copied ? "Copied!" : "Copy?"}
      </span>
    </button>

    <!-- LLM Website -->
    <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">
      <strong class="font-medium">LLM Website:</strong>
      <a
        href={pattern.llmWebsite}
        target="_blank"
        class="text-blue-500 hover:underline dark:text-blue-400"
      >
        {pattern!.llmWebsite}
      </a>
    </p>

    <p class="border-width-[2px] mb-4 flex flex-row border border-white p-2">
      <strong class="text-bold m-2 p-2">ClickAndGo!</strong>
      {#each mostCommonWebsites as url}
        <button
          class="border-width-[2px] m-2 border bg-black p-2 text-white dark:border-white"
          onclick={() => clickNGo(url)}>{url}</button
        >
      {/each}
    </p>

    <div class="border-width-[2px] dark:boder-white border p-5">
      <!-- Additional Info -->
      <h2 class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Additional Info</h2>
      <ul class="list-none space-y-2 text-gray-700 dark:text-gray-300">
        <li><strong class="font-medium">Category:</strong> {pattern.category}</li>
        <li><strong class="font-medium">Usage Count:</strong> {pattern.usageCount}</li>
        <li><strong class="font-medium">Public:</strong> {pattern.public ? "Yes" : "No"}</li>
        <li><strong class="font-medium">Created At:</strong> {pattern.createdAt}</li>
        <li><strong class="font-medium">Updated At:</strong> {pattern.updatedAt}</li>
      </ul>
    </div>
  </section>
{:else}
  pattern is undefined
{/if}
