import getConfig from 'next/config';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
//import { serviceDS } from '../demo/service/Service';
import { LayoutContext } from '../layout/context/layoutcontext';
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from 'primereact/badge';

const Dashboard = () => {
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const [booking, setBooking] = useState([]);
    const [user, setUsers] = useState([]);
    const [provider, setProviders] = useState([]);
    const [providerB, setBProviders] = useState([]);
    const [usersPerDay, setUsersPerDay] = useState({});
    const [reviews, setReviews] = useState({});
    const [providersPerWeek, setProvidersPerWeek] = useState({});

    useEffect(() => {
        async function getPageDataForReviews() {
          const apiUrlEndpoint = "http://localhost:3000/review";
          const response = await fetch(apiUrlEndpoint);
          const reviews = await response.json();
          setReviews(reviews);
        }
        getPageDataForReviews();
      }, []);

          useEffect(() => {
            async function getPageDataForBooking() {
              const apiUrlEndpoint = "http://localhost:3000/booking";
              const response = await fetch(apiUrlEndpoint);
              const res = await response.json();
              const bookingsByMonth = res.map(booking => {
                const month = new Date(booking.start_date).toLocaleString('default', { month: 'long' });
                return { ...booking, month };
              });
              setBooking(bookingsByMonth);
            }
            getPageDataForBooking();
          }, []);

          const bookingsByMonth = booking.reduce((acc, booking) => {
            if (!acc[booking.month]) {
              acc[booking.month] = 0;
            }
            acc[booking.month]++;
            return acc;
          }, {});

    Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
      };

      const bookingsByWeek = booking.reduce((acc, booking) => {
        const week = new Date(booking.start_date).getWeek();
        acc[week] = acc[week] || [];
        acc[week].push(booking);
        return acc;
      }, {});
    
      const bookingsPerWeek = Object.keys(bookingsByWeek).map((week) => {
        const bookings = bookingsByWeek[week];
        const percentage = ((bookings.length / totalBookings) * 100).toFixed(2);
        const bookingDetails = bookings.map((booking) => booking.idbooking).join(', ');
        return {
          week,
          bookings,
          percentage,
          bookingDetails,
        };
      });
      
      useEffect(() => {
        async function getPageDataForUsers() {
          const apiUrlEndpoint = "http://localhost:3000/admin/users";
          const response = await fetch(apiUrlEndpoint);
          const res = await response.json();
          const usersByMonth = res.map(user => {
            const month = new Date(user.created_at).toLocaleString('default', { month: 'long' });
            return { ...user, month };
          });
          setUsers(usersByMonth);
        }
        getPageDataForUsers();
      }, []);

      const usersByMonth = user.reduce((acc, user) => {
        if (!acc[user.month]) {
          acc[user.month] = 0;
        }
        acc[user.month]++;
        return acc;
      }, {});


      
      const usersByDay = user.reduce((acc, user) => {
        const date = new Date(user.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      
      const userPerDay = Object.values(usersByDay);
          
          useEffect(() => {
            async function getPageDataForProviders() {
              const apiUrlEndpoint = "http://localhost:3000/admin/providers";
              const response = await fetch(apiUrlEndpoint);
              const res = await response.json();
              const providersByMonth = res.map(provider => {
                const month = new Date(provider.created_at).toLocaleString('default', { month: 'long' });
                return { ...provider, month };
              });
              const providersByWeek = res.map(provider => {
                const week = new Date(provider.created_at).getWeek();
                return { ...provider, week };
              });
              setProvidersPerWeek(providersByWeek);
              setProviders(providersByMonth);
            }
            getPageDataForProviders();
          }, []);

          
    
          const providersByMonth = provider.reduce((acc, provider) => {
            if (!acc[provider.month]) {
              acc[provider.month] = 0;
            }
            acc[provider.month]++;
            return acc;
          }, {});

          
          const providersByWeek = provider.reduce((acc, provider) => {
            if (!acc[provider.week]) {
              acc[provider.week] = 0;
            }
            acc[provider.week]++;
            return acc;
          }, {});
          



    const totalBookings = booking.length;
    const totalUsers = user.length;
    const totalProviders = provider.length;

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: "Users",
            data: Object.values(usersByMonth),
            fill: false,
            backgroundColor: "#4b6f89",
            borderColor: "#4b6f89",
            tension: 0.4,
          },
          {
            label: 'Providers',
            data: Object.values(providersByMonth),
            fill: false,
            backgroundColor: '#7E0B5B',
            borderColor: '#7E0B5B',
            tension: 0.4
          },
          {
            label: 'Bookings',
            data: Object.values(bookingsByMonth),
            fill: false,
            backgroundColor: '#5aa06b',
            borderColor: '#5aa06b',
            tension: 0.4
          }
        ]
      };

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    useEffect(() => {
          async function fetchTopSellingProviders() {
          const apiUrlEndpoint = "http://localhost:3000/best";
          const response = await fetch(apiUrlEndpoint);
          const res = await response.json();
          setBProviders(res);
        }
    
        fetchTopSellingProviders();
      }, []);
    
      const formatPercentage = (value) => `${value}%`;
    
      const percentageBodyTemplate = (rowData) => {
        const percentage = ((rowData.booking_count / booking.length) * 100).toFixed(2) + "%";
        return (
          <>
            <ProgressBar style= {{"color" : "#7210FF"}} value={((rowData.booking_count / booking.length) * 100).toFixed(2)} showValue={false} displayValueTemplate={formatPercentage} />
            <span style= {{"fontWeight" : "bold"}}>{percentage}</span>
          </>
        );
      };
    
      const formatDate = (rowData) => {
      const date = new Date(rowData.start_date);
      return date.toLocaleDateString();
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Services</span>
                            <div className="text-900 font-medium text-xl">{totalProviders}</div>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">2 new </span>
                    <span className="text-500"> this week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Bookings</span>
                            <div className="text-900 font-medium text-xl">{totalBookings}</div>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">
                    {bookingsPerWeek.length}
                    </span>
                    <span className="text-500"> since last week</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Customers</span>
                            <div className="text-900 font-medium text-xl">{totalUsers}</div>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">3</span>
                    <span className="text-500"> newly registered today</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Reviews</span>
                            <span className="text-green-500 font-medium text-xl">{reviews.length} </span>
                            <span className="text-500">in total</span>
                        <div className="flex align-items-center justify-content-center bg-transparent-100 border-round" style={{ height: '1.4rem' }}>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card">
            <h5>Recent Bookings</h5>
                <DataTable key={booking.id} value={booking} rows={5} sortField="start_date" sortOrder={-1} pageLinkSize={3} paginator responsiveLayout="scroll">
                  <Column field="provider.username" header="Provider" style={{ width: '35%' }} />
                  <Column field="user.username" header="Recepient" style={{ width: '35%' }} />
                  <Column field="start_date" header="Start Date" body={formatDate} style={{ width: '35%' }} />
                  <Column field="price" header="price" style={{ width: '35%' }} body={(rowData) => `${rowData.price} TND`}/>
                </DataTable> 
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Overview</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>

                <div className="card">
                    <div>
                    <h5>Top Selling Providers</h5>
                <DataTable value={providerB} rows={6} pageLinkSize={3} paginator responsiveLayout="scroll">
                <Column field="username" header="Provider" />
                <Column field="booking_count" header="Booking Percentage" body={percentageBodyTemplate} />
                <Badge value={`${((providerB.bookingCount / totalBookings) * 100).toFixed(2)}%`} />
                </DataTable>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
