<script lang="ts">
  import type { PageProps } from "./$types";
  import Table from "$lib/components/Table.svelte";

  let { data }: PageProps = $props();
  const columnDefs = [
    { field: "id", sortable: true, filter: true },
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
