<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import type { CellClickedEvent } from "ag-grid-community";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";
  import { onDestroy, onMount } from "svelte";
  import { on } from "svelte/events";

  const onPromptClicked = (event: CellClickedEvent) => {
    const id = event.data.id;
    goto(`/patterns/${id}`);
  };

  let { data } = $props();

  let patterns = writable(data.patterns);

  const columnDefs = [
    {
      field: "id",
      sortable: true,
      filter: true,
      onCellClicked: onPromptClicked,
      width: 80,
    },
    { field: "name", sortable: true, filter: true, onCellClicked: onPromptClicked },
    { field: "formatString", sortable: true, filter: true, onCellClicked: onPromptClicked },
    { field: "notes", sortable: true, filter: true, onCellClicked: onMount },
    { field: "llmWebsite", sortable: true, filter: true, onCellClicked: onMount },
    { field: "category", sortable: true, filter: true, onCellClicked: onMount },
    { field: "usageCount", sortable: true, filter: true, width: 80, onCellClicked: onMount },
    { field: "public", sortable: true, filter: true, width: 80, onCellClicked: onMount },
    { field: "userId", sortable: true, filter: true, width: 80, onCellClicked: onMount },
    { field: "createdAt", sortable: true, filter: true, onCellClicked: onMount },
    { field: "updatedAt", sortable: true, filter: true, onCellClicked: onMount },
  ];

  async function searchName(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (query === "") {
      const res = await (await fetch(`/api/promptPatterns/get`)).json();
      console.log("updated");
      $patterns = res;
    }

    const res = await (await fetch(`/api/promptPatterns/get?name=${query}`)).json();
    console.log("updated");
    $patterns = res;
  }

  const debounce = (callback: Function, wait = 300) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), wait);
    };
  };

  let input: HTMLInputElement;

  let keydown = $state({
    Control: false,
    Meta: false,
  });

  onMount(() => {
    on(window, "keydown", (e) => {
      if (e.key === "Control") {
        keydown["Control"] = true;
      }
      if (e.key === "Meta") {
        keydown["Control"] = true;
      }

      if (e.key === "k" && (keydown["Control"] || keydown["Meta"])) {
        input.scrollIntoView();
        input.focus();
      }
    });

    on(window, "keyup", (e) => {
      if (e.key === "Control") {
        keydown["Control"] = false;
      }
      if (e.key === "Meta") {
        keydown["Meta"] = false;
      }
    });
  });
</script>

<section class="flex flex-col">
  <input
    onkeyup={debounce(searchName, 300)}
    placeholder="CMD-K / CTRL-K"
    class="border-width-[2px] mx-10 mb-5 border border-white bg-black"
    bind:this={input}
  />
  <Table data={patterns} {columnDefs} />
</section>
