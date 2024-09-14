import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { fetchDataTable } from '../services/table-services';
import { Table } from '../types/table';
import { TbMenuOrder } from "react-icons/tb";

const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Table[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Record<number, Table>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [overlayInput, setOverlayInput] = useState<number>(1);
  const overlayPanelRef = useRef<any>(null);

  const loadArtworks = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchDataTable(page);
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArtworks(currentPage);
  }, [currentPage, loadArtworks]);

  const onPageChange = (event: DataTableStateEvent) => {
    const page = event.page !== undefined ? event.page + 1 : 1;
    setCurrentPage(page);
  };

  const handleSelectRows = () => {
    const numberToSelect = Math.min(overlayInput, artworks.length);
    const newSelected = artworks.slice(0, numberToSelect).reduce((acc, artwork) => {
      acc[artwork.id] = artwork;
      return acc;
    }, { ...selectedArtworks });
    setSelectedArtworks(newSelected);
    if (overlayPanelRef.current) {
      overlayPanelRef.current.hide();
    }
  };

  const openOverlayPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (overlayPanelRef.current) {
      overlayPanelRef.current.toggle(event);
    }
  };

  const selectRowsHeader = (
    <div className="select-rows-container">
      <button onClick={openOverlayPanel}><TbMenuOrder/></button>
      <OverlayPanel ref={overlayPanelRef} showCloseIcon>
        <div>
          <InputText
            type="number"
            value={overlayInput.toString()}
            onChange={(e) => setOverlayInput(Number(e.target.value))}
            placeholder="Number of rows"
          />
          <button onClick={handleSelectRows}>Select</button>
        </div>
      </OverlayPanel>
    </div>
  );

  return (
    <div className="artwork-table">
      <DataTable
        value={artworks}
        paginator
        rows={10}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={onPageChange}
        selection={Object.values(selectedArtworks)}
        onSelectionChange={(e) => setSelectedArtworks(e.value.reduce((acc, artwork) => {
          acc[artwork.id] = artwork;
          return acc;
        }, {}))}
        dataKey="id"
        rowHover
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>

        <Column header={selectRowsHeader} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};

export default ArtworkTable;
