import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import 'primereact/confirmdialog';

function Crud() {
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const totalProviders = providers.length;

  useEffect(() => {
    async function getPageDataForProviders() {
      const apiUrlEndpoint = "http://localhost:3000/admin/providers";
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setProviders(res);
    }
    getPageDataForProviders();
  }, []);

  async function handleDeleteProviders() {
    const selectedIds = selectedProviders.map((provider) => provider.idproviders);
    const apiUrlEndpoint = `http://localhost:3000/admin/providers/`;

    const deletePromises = selectedIds.map((id) =>
      fetch(`${apiUrlEndpoint}${id}`, { method: "DELETE" })
    );

    try {
      // Wait for all the delete requests to complete or something
      const responses = await Promise.all(deletePromises);
      if (responses.every((response) => response.ok)) {
        // Remove the deleted providers from the state 
        setProviders(providers.filter((provider) => !selectedIds.includes(provider.idproviders)));
        setSelectedProviders([]);
      } else {
        console.error(`Failed to delete providers with IDs ${selectedIds.join(",")}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const idBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">ID</span>
            {rowData.idproviders}
        </>
    );
};

const usernameBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Username</span>
            {rowData.username}
        </>
    );
};


const serviceBodyTemplate = (rowData) => {
    return (
        <>
            <span className="p-column-title">Service</span>
            {rowData.service}
        </>
    );
};

  function confirmDelete() {
    setShowConfirmDialog(true);
  }

  function hideConfirmDialog() {
    setShowConfirmDialog(false);
  }

  function onConfirm() {
    handleDeleteProviders();
    setShowConfirmDialog(false);
  }

  function onPageChange(event) {
    setFirst(event.first);
    setRows(event.rows);
  }

  const deleteButtonDisabled = selectedProviders.length === 0;

  const slicedProviders = providers
  .filter((provider) => {
    const { service, username, idproviders } = provider;
    const query = searchQuery.toLowerCase();
    return service.toLowerCase().includes(query) || username.toLowerCase().includes(query) || idproviders.toLowerCase().includes(query);
  })
  .slice(first, first + rows);


  return (
    <div className="p-d-flex p-jc-between p-ai-center">
      <div className="p-d-flex p-ai-center">
    <Button
      label="Delete selected providers"
      icon="pi pi-trash"
      onClick={confirmDelete}
      disabled={deleteButtonDisabled}
    />&nbsp;
         <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" type="text" id="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </span>
  </div>
      <DataTable value={slicedProviders} selection={selectedProviders} onSelectionChange={(e) => setSelectedProviders(e.value)}>
        <Column selectionMode="multiple" />
        {/* <Column field="idproviders" header="ID" sortable body={idBodyTemplate} headerStyle={{ minWidth: '5rem' }}/> */}
        <Column field="service" header="Service" sortable body={serviceBodyTemplate} headerStyle={{ minWidth: '5rem' }}/>
        <Column field="username" header="Username" sortable body={usernameBodyTemplate} headerStyle={{ minWidth: '5rem' }}/>
        {/* <Column field="firstName" header="First Name" />
        <Column field="lastName" header="Last Name" /> */}
        <Column field="age" header="Age" />
        <Column field="experience" header="Experience" />
        <Column field="adresse" header="Address" />
        <Column field="price" header="Price" body={(rowData) => rowData.price + ' TND'} />
      </DataTable>
      <Paginator first={first} rows={rows} totalRecords={totalProviders} onPageChange={onPageChange} rowsPerPageOptions={[5, 10]}></Paginator>
      <ConfirmDialog header="Confirm" message={`Are you sure you want to delete ${selectedProviders.length} providers?`} visible={showConfirmDialog} onHide={hideConfirmDialog} accept={onConfirm} reject={hideConfirmDialog} />
    </div>
  );
}

export default Crud;