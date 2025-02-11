<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#each data.patterns as pattern}
  <p>{pattern.name}</p>
{/each}
