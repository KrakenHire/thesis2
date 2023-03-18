import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function confirmProviders() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function getPageDataForProviders() {
      const apiUrlEndpoint = "http://localhost:3000/admin/providers";
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setProviders(res);
    }
    getPageDataForProviders();
  }, []);

  async function confirmProvider(id) {
    const apiUrlEndpoint = `http://localhost:3000/admin/providers/${id}/confirm`;
    const response = await fetch(apiUrlEndpoint, {
      method: "PUT",
    });
    if (response.ok) {
      const updatedDataResponse = await fetch("http://localhost:3000/admin/providers");
      const updatedData = await updatedDataResponse.json();
      setProviders(updatedData);
    } else {
      console.log("Error confirming provider:", response.status, response.statusText);
    }
  }

  const nonConfirmedProviders = providers.filter((provider) => !provider.confirmed);

  const actionTemplate = (rowData) => (
    <Button
      label="Confirm Provider"
      className="p-button-success"
      onClick={() => confirmProvider(rowData.idproviders)}
      disabled={rowData.confirmed}
    />
  );

  return (
    <div>
      <DataTable value={nonConfirmedProviders} className="p-datatable-sm">
        <Column field="username" header="Username"></Column>
        <Column field="service" header="Service"></Column>
        <Column field="age" header="Age"></Column>
        <Column field="phoneNumber" header="Phone Number"></Column>
        <Column
          field="confirmed"
          header="Confirmed"
          body={(rowData) => (rowData.confirmed ? "Yes" : "No")}
        ></Column>
        <Column body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}

export default confirmProviders;