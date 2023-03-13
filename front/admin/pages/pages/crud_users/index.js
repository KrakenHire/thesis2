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
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function getPageDataForUsers() {
      const apiUrlEndpoint = "http://localhost:3000/admin/users";
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setUsers(res);
    }
    getPageDataForUsers();
  }, []);

  async function handleBanusers() {
    const selectedIds = selectedUsers.map((user) => user.iduser);
    const apiUrlEndpoint = `http://localhost:3000/admin/users/ban`;
  
    const banPromises = selectedIds.map((iduser) =>
      fetch(`${apiUrlEndpoint}${iduser}`, { method: "POST" })
    );
  
    try {
      const responses = await Promise.all(banPromises);
      if (responses.every((response) => response.ok)) {
        setUsers(
          users.map((user) =>
            selectedIds.includes(user.iduser)
              ? { ...user, isBanned: true }
              : user
          )
        );
        setSelectedUsers([]);
      } else {
        console.error(`Failed to ban users with IDs ${selectedIds.join(",")}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const idBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">ID</span>
        {rowData.iduser}
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

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Full Name
</span>
        {rowData.FirstName} {rowData.LastName}
      </>
    );
  };
const emailBodyTemplate = (rowData) => {
return (
<>
<span className="p-column-title">Email</span>
{/* {rowData.email} */} placeholder@example.com
</>
);
};

const statusBodyTemplate = (rowData) => {
return (
<>
<span className="p-column-title">Status</span>
{rowData.isBanned ? "Banned" : "Active"}
</>
);
};

const actionBodyTemplate = (rowData) => {
return (
<>
<Button label="Ban" icon="pi pi-ban" color="red"
onClick={() => setShowConfirmDialog(true)}
/>
</>
);
};

const onPageChange = (event) => {
setCurrentPage(event.page);
};

const onRowsChange = (event) => {
setRowsPerPage(event.target.value);
setCurrentPage(0);
};

const header = (
<div className="table-header">
<span className="p-input-icon-left">
<i className="pi pi-search" />
<InputText
type="search"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
placeholder="Search..."
/>
</span>
</div>
);

const paginatorTemplate = "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown";


return (
<div className="datatable-crud-demo">
<div className="card">
<DataTable
value={users.filter((user) =>
user.username.toLowerCase().includes(searchQuery.toLowerCase())
)}
header={header}
paginator
rows={rowsPerPage}
currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
paginatorTemplate={paginatorTemplate}
first={currentPage * rowsPerPage}
onPageChange={onPageChange}
onRows={onRowsChange}
selection={selectedUsers}
onSelectionChange={(e) => setSelectedUsers(e.value)}
dataKey="iduser"
>
<Column
selectionMode="multiple"
headerStyle={{ width: "3rem" }}
></Column>
<Column
         field="iduser"
         header="ID"
         body={idBodyTemplate}
         sortable
         filter
       />
<Column
         field="username"
         header="Username"
         body={usernameBodyTemplate}
         sortable
         filter
       />
{/* <Column field="name" header="Full Name" body={nameBodyTemplate} /> */}
<Column field="email" header="Email" body={emailBodyTemplate} />
<Column field="isBanned" header="Status" body={statusBodyTemplate} />
<Column body={actionBodyTemplate} />
</DataTable>
<ConfirmDialog
visible={showConfirmDialog}
onHide={() => setShowConfirmDialog(false)}
message="Are you sure you want to bn this user?"
header="Confirmation"
icon="pi pi-exclamation-triangle"
acceptClassName="p-button-danger"
acceptLabel="Yes"
rejectLabel="No"
accept={() => handleBanusers()}
reject={() => setShowConfirmDialog(false)}
/>
</div>
</div>
);
}

export default Crud;