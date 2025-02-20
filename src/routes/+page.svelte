<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import type { CellClickedEvent } from "ag-grid-community";
  import {goto} from "$app/navigation";

  const onPromptClicked = (event: CellClickedEvent) => {
    const id = event.data.id;
    goto(`/patterns/${id}`);
  }

  const { data } = $props();
  const columnDefs = [
    {
      field: "id",
      sortable: true,
      filter: true,
      onCellClicked: onPromptClicked    },
    { field: "name", sortable: true, filter: true },
    { field: "formatString", sortable: true, filter: true },
    { field: "notes", sortable: true, filter: true },
    { field: "llmWebsite", sortable: true, filter: true },
    { field: "category", sortable: true, filter: true },
    { field: "usageCount", sortable: true, filter: true },
    { field: "public", sortable: true, filter: true },
    { field: "userId", sortable: true, filter: true },
    { field: "createAt", sortable: true, filter: true },
    { field: "updatedAt", sortable: true, filter: true },
  ];
</script>

<Table data={data.patterns} {columnDefs} />
