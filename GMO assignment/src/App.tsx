import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";

interface Artwork {
  id: number;
  title: string | null;
  place_of_origin: string | null;
  artist_display: string | null;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

export default function PaginatorBasicDemo() {
  const op = useRef<OverlayPanel | null>(null);
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [first, setFirst] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const rows = 12;
  const [customNumber, setCustomNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const BASE = import.meta.env.VITE_BASE_API_URL;

  const apiData = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE}/artworks?page=${page}`);
      setArtwork(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiData(1);
  }, []);

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setFirst(e.first);
    apiData(e.page + 1);
  };

  const customSelect = async (num: number) => {
    const temp: Artwork[] = [];
    let range = Math.floor(num / rows) + 1;
    for (let i = 1; i <= range; i++) {
      const res = await axios.get(`${BASE}/artworks?page=${i}`);
      temp.push(...res.data.data);
    }
    const finalData = temp.slice(0, num);
    setSelectedArtworks(finalData);
    console.log(finalData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <div>
        <DataTable
          value={artwork}
          selectionMode="multiple"
          selection={selectedArtworks}
          onSelectionChange={(e) => setSelectedArtworks(e.value)}
          dataKey="id"
          rows={rows}
          loading={loading}
          tableStyle={{ minWidth: "50rem" }}
        
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

          <Column
            header={() => (
              <div>
                <Button
                  type="button"
                  icon="pi pi-angle-down"
                  text
                  onClick={(e) => op.current?.toggle(e)}
                />

                <OverlayPanel ref={op}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <InputText
                      type="number"
                      placeholder="Enter the number of rows"
                      onChange={(e) => setCustomNumber(Number(e.target.value))}
                    />
                    <Button onClick={() => customSelect(customNumber)}>
                      Submit
                    </Button>
                  </div>
                </OverlayPanel>
              </div>
            )}
          />

          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Origin" />
          <Column field="artist_display" header="Artist" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Start" />
          <Column field="date_end" header="End" />
        </DataTable>

        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[12, 24, 36]}
          onPageChange={onPageChange}
        />
      </div>

      <div style={{ margin: "10px", textAlign: "center" }}>
        Note: The core logic of this assignment was implemented without the use
        of AI tools. TypeScript type references were occasionally checked for
        syntax clarification, but no AI-generated code was used for main
        functionality.
      </div>
    </div>
  );
}
