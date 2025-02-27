<script lang="ts">
  import { onMount } from "svelte";
  import { type GridApi, createGrid, type GridOptions, ModuleRegistry } from "ag-grid-community";
  import { ClientSideRowModelModule } from "ag-grid-community";
  import { themeQuartz } from "ag-grid-community";

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  let { data, columnDefs } = $props();

  let gridElement: HTMLDivElement;
  let gridApi: GridApi;

  const myTheme = themeQuartz.withParams({
    accentColor: "#15BDE8",
    backgroundColor: "#0C0C0D",
    borderColor: "#ffffff00",
    borderRadius: 20,
    browserColorScheme: "dark",
    cellHorizontalPaddingScale: 1,
    chromeBackgroundColor: {
      ref: "backgroundColor",
    },
    columnBorder: false,
    fontFamily: {
      googleFont: "Roboto",
    },
    fontSize: 16,
    foregroundColor: "#BBBEC9",
    headerBackgroundColor: "#182226",
    headerFontSize: 14,
    headerFontWeight: 500,
    headerTextColor: "#FFFFFF",
    headerVerticalPaddingScale: 0.9,
    iconSize: 20,
    rowBorder: false,
    rowVerticalPaddingScale: 1.2,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: true,
    wrapperBorderRadius: 10,
  });

  const gridOptions: GridOptions = {
    columnDefs,
    rowData: $data,
    rowSelection: "single",
    defaultColDef: {
      resizable: true,
    },
    rowModelType: "clientSide",
    theme: myTheme,
  };

  onMount(() => {
    gridApi = createGrid(gridElement, gridOptions);

    data.subscribe(() => {
      gridApi.setGridOption("rowData", $data);
    });
  });
</script>

<div bind:this={gridElement} class="ag-theme-alpine w-full rounded-xl" style="height: 70vh"></div>
