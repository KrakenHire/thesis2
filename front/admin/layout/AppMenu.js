import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Pages',
            items: [
                {   label: 'Message',
                    icon: 'pi pi-fw pi-comment',
                    to: '/messages' },
                {
                    label: 'Manage Services',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud'
                },
                {
                    label: 'Manage Users',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud2'
                }
            ]
        },
        {
            label: 'Overview',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/charts' },
            ]
        },
        {
            label: 'Extra',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    to: '/landing'
                },
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
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
