<script lang="ts">
  const categories = [
    "Software Development",
    "Algorithm Design",
    "Bug Fixing",
    "Code Documentation",
    "Data Science",
    "Machine Learning",
    "Natural Language Processing",
    "Scientific Writing",
    "Research Summarization",
    "Literature Review",
    "Code Optimization",
    "API Design",
    "Database Design",
    "Test Automation",
    "Technical Blogging",
    "Code Refactoring",
    "User Interface Design",
    "Project Management",
    "DevOps",
    "Other",
  ];

  const urls = [
    "https://chat.openai.com",
    "https://claude.ai",
    "https://www.perplexity.ai",
    "https://gemini.google.com",
    "https://chat.mistral.ai",
    "https://huggingface.co/chat",
    "https://huggingface.co/spaces/meta-llama",
  ];

  // test
  const userID = 1;
</script>

<h1 class="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
  Create New Prompt Pattern
</h1>

<form method="POST">
  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">
    Name
    <input
      type="text"
      name="name"
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      required
    />
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">
    Format String
    <textarea
      name="formatString"
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
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      list="urls"
    />
    <datalist id="urls">
      {#each urls as url}
        <option>{url}</option>
      {/each}
    </datalist>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Notes
    <textarea
      name="notes" class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    ></textarea>
  </label>

  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Category
    <select
      name="category" class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <option value="" disabled selected>Select a Category</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </label>

  <!-- Public Status Field -->
  <label class="block text-lg font-medium text-gray-700 dark:text-gray-300"
    >Public
    <input type="checkbox" class="rounded-md" name="public" />
  </label>

  <!-- User ID Field -->
  <label>
    <input
      type="hidden"
      class="mt-2 w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      value={userID}
      name="userID"
    />
  </label>

  <!-- Submit Button -->
  <button
    class="w-full rounded-md bg-blue-500 p-2 text-white shadow-md transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    Create Prompt Pattern
  </button>
</form>
