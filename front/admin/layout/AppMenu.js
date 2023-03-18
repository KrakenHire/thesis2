import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import 'primeicons/primeicons.css';

const AppMenu = () => {
  const [nonConfirmedProviders, setNonConfirmedProviders] = useState([]);

  useEffect(() => {
    async function fetchNonConfirmedProviders() {
      const response = await fetch("http://localhost:3000/admin/providers");
      const providers = await response.json();
      const nonConfirmedProviders = providers.filter(provider => !provider.confirmed);
      setNonConfirmedProviders(nonConfirmedProviders);
    }
  
    fetchNonConfirmedProviders();
  }, []); 


  const model = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
      label: 'Pages',
      items: [
        {
          label: nonConfirmedProviders.length > 0
            ? `Manage Providers (${nonConfirmedProviders.length})`
            : 'Manage Providers',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: nonConfirmedProviders.length > 0
                ? `Confirm Providers (${nonConfirmedProviders.length})`
                : 'Confirm Providers',
              icon: 'pi pi-fw pi-check-circle',
              to: '/pages/crud2'
            },
            {
              label: 'View/Remove Services',
              icon: 'pi pi-fw pi-key',
              to: '/pages/crud'
            }]
        },
        {
          label: 'Manage Users',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'View/Ban Users',
              icon: 'pi pi-fw pi-key',
              to: '/pages/crud_users'
            }]
        }
      ]
    },
    {
      label: 'Overview',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        { label: 'Charts (Coming Soon)', icon: 'pi pi-fw pi-chart-bar' },
      ]
    },
    {
      label: 'Extra',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        {
          label: 'Auth',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-sign-in',
              to: '/auth/login'
            }
          ]
        }
      ]
    }
  ];

  return (
    <MenuProvider>
                {nonConfirmedProviders.length > 0 && (
  <div style={{
    backgroundColor: '#7210FF',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '56px',
    padding: '0.9rem'
  }}>
    {`There are ${nonConfirmedProviders.length} unconfirmed providers.`}
  </div>
)}
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}

      </ul>
    </MenuProvider>
  );
};

export default AppMenu;