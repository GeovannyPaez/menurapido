document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  const sectionTitle = document.getElementById('section-title');
  const navLinks = document.querySelectorAll('.nav-link');
  const languageBtn = document.getElementById('language-btn');
  const languageModal = new bootstrap.Modal(document.getElementById('languageModal'));

  // Navigation
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const section = link.getAttribute('data-section');
          sectionTitle.textContent = link.textContent.trim();
          loadSection(section);
      });
  });

  // Language selection
  languageBtn.addEventListener('click', () => {
      languageModal.show();
  });

  document.querySelectorAll('#languageModal .list-group-item').forEach(item => {
      item.addEventListener('click', () => {
          const lang = item.getAttribute('data-lang');
          // Here you would implement the language change logic
          console.log(`Changing language to: ${lang}`);
          languageModal.hide();
      });
  });

  // Load initial section
  loadSection('overview');

  function loadSection(section) {
      switch(section) {
          case 'overview':
              renderOverview();
              break;
          case 'menus':
              renderMenus();
              break;
          case 'orders':
              renderOrders();
              break;
          case 'payments':
              renderPayments();
              break;
          case 'stats':
              renderStats();
              break;
      }
  }

  function renderOverview() {
      mainContent.innerHTML = `
          <div class="row">
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Ingresos (Mensuales)</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-currency-dollar fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Pedidos (Hoy)</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">215</div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-bag fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-info shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasa de Satisfacción</div>
                                  <div class="row no-gutters align-items-center">
                                      <div class="col-auto">
                                          <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">78%</div>
                                      </div>
                                      <div class="col">
                                          <div class="progress progress-sm mr-2">
                                              <div class="progress-bar bg-info" role="progressbar" style="width: 78%" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-emoji-smile fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-warning shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Platos Pendientes</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-clock-history fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-xl-8 col-lg-7">
                  <div class="card shadow mb-4">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 class="m-0 font-weight-bold text-primary">Resumen de Ingresos</h6>
                      </div>
                      <div class="card-body">
                          <div class="chart-area">
                              <canvas id="myAreaChart"></canvas>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-4 col-lg-5">
                  <div class="card shadow mb-4">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 class="m-0 font-weight-bold text-primary">Fuentes de Ingresos</h6>
                      </div>
                      <div class="card-body">
                          <div class="chart-pie pt-4 pb-2">
                              <canvas id="myPieChart"></canvas>
                          </div>
                          <div class="mt-4 text-center small">
                              <span class="mr-2">
                                  <i class="bi bi-circle-fill text-primary"></i> Comedor
                              </span>
                              <span class="mr-2">
                                  <i class="bi bi-circle-fill text-success"></i> Delivery
                              </span>
                              <span class="mr-2">
                                  <i class="bi bi-circle-fill text-info"></i> Para llevar
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

      // Area Chart
      var ctx = document.getElementById("myAreaChart");
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
              datasets: [{
                  label: "Ingresos",
                  lineTension: 0.3,
                  backgroundColor: "rgba(78, 115, 223, 0.05)",
                  borderColor: "rgba(78, 115, 223, 1)",
                  pointRadius: 3,
                  pointBackgroundColor: "rgba(78, 115, 223, 1)",
                  pointBorderColor: "rgba(78, 115, 223, 1)",
                  pointHoverRadius: 3,
                  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                  pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                  pointHitRadius: 10,
                  pointBorderWidth: 2,
                  data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
              }],
          },
          options: {
              maintainAspectRatio: false,
              layout: {
                  padding: {
                      left: 10,
                      right: 25,
                      top: 25,
                      bottom: 0
                  }
              },
              scales: {
                  xAxes: [{
                      time: {
                          unit: 'date'
                      },
                      gridLines: {
                          display: false,
                          drawBorder: false
                      },
                      ticks: {
                          maxTicksLimit: 7
                      }
                  }],
                  yAxes: [{
                      ticks: {
                          maxTicksLimit: 5,
                          padding: 10,
                          callback: function(value, index, values) {
                              return '$' + number_format(value);
                          }
                      },
                      gridLines: {
                          color: "rgb(234, 236, 244)",
                          zeroLineColor: "rgb(234, 236, 244)",
                          drawBorder: false,
                          borderDash: [2],
                          zeroLineBorderDash: [2]
                      }
                  }],
              },
              legend: {
                  display: false
              },
              tooltips: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  titleMarginBottom: 10,
                  titleFontColor: '#6e707e',
                  titleFontSize: 14,
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  intersect: false,
                  mode: 'index',
                  caretPadding: 10,
                  callbacks: {
                      label: function(tooltipItem, chart) {
                          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                      }
                  }
              }
          }
      });

      // Pie Chart
      var ctx = document.getElementById("myPieChart");
      new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ["Comedor", "Delivery", "Para llevar"],
              datasets: [{
                  data: [55, 30, 15],
                  backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                  hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                  hoverBorderColor: "rgba(234, 236, 244, 1)",
              }],
          },
          options: {
              maintainAspectRatio: false,
              tooltips: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  caretPadding: 10,
              },
              legend: {
                  display: false
              },
              cutoutPercentage: 80,
          },
      });
  }

  function renderMenus() {
      mainContent.innerHTML = `
          <div class="card shadow mb-4">
              <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Gestión de Menús</h6>
              </div>
              <div class="card-body">
                  <div class="table-responsive">
                      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                              <tr>
                                  <th>Nombre del Plato</th>
                                  <th>Categoría</th>
                                  <th>Precio</th>
                                  <th>Estado</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Hamburguesa Clásica</td>
                                  <td>Platos Principales</td>
                                  <td>$10.99</td>
                                  <td><span class="badge bg-success">Activo</span></td>
                                  <td>
                                      <button class="btn btn-primary btn-sm">Editar</button>
                                      <button class="btn btn-danger btn-sm">Eliminar</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Ensalada César</td>
                                  <td>Ensaladas</td>
                                  <td>$8.99</td>
                                  <td><span class="badge bg-success">Activo</span></td>
                                  <td>
                                      <button class="btn btn-primary btn-sm">Editar</button>
                                      <button class="btn btn-danger btn-sm">Eliminar</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Pizza Margherita</td>
                                  <td>Platos Principales</td>
                                  <td>$12.99</td>
                                  <td><span class="badge bg-warning text-dark">Agotado</span></td>
                                  <td>
                                      <button class="btn btn-primary btn-sm">Editar</button>
                                      <button class="btn btn-danger btn-sm">Eliminar</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Tiramisú</td>
                                  <td>Postres</td>
                                  <td>$7.99</td>
                                  <td><span class="badge bg-success">Activo</span></td>
                                  <td>
                                      <button class="btn btn-primary btn-sm">Editar</button>
                                      <button class="btn btn-danger btn-sm">Eliminar</button>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <button class="btn btn-success mt-3">Añadir Nuevo Plato</button>
              </div>
          </div>
      `;
  }

  function renderOrders() {
      mainContent.innerHTML = `
          <div class="card shadow mb-4">
              <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Pedidos Recientes</h6>
              </div>
              <div class="card-body">
                  <div class="table-responsive">
                      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                              <tr>
                                  <th>ID Pedido</th>
                                  <th>Cliente</th>
                                  <th>Fecha</th>
                                  <th>Total</th>
                                  <th>Estado</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>#1234</td>
                                  <td>Juan Pérez</td>
                                  <td>2023-05-20 14:30</td>
                                  <td>$35.97</td>
                                  <td><span class="badge bg-warning text-dark">Preparando</span></td>
                                  <td>
                                      <button class="btn btn-info btn-sm">Detalles</button>
                                      <button class="btn btn-success btn-sm">Completar</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>#1235</td>
                                  <td>María García</td>
                                  <td>2023-05-20 15:15</td>
                                  <td>$22.99</td>
                                  <td><span class="badge bg-info">En Camino</span></td>
                                  <td>
                                      <button class="btn btn-info btn-sm">Detalles</button>
                                      <button class="btn btn-success btn-sm">Completar</button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>#1236</td>
                                  <td>Carlos Rodríguez</td>
                                  <td>2023-05-20 16:00</td>
                                  <td>$41.98</td>
                                  <td><span class="badge bg-success">Entregado</span></td>
                                  <td>
                                      <button class="btn btn-info btn-sm">Detalles</button>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      `;
  }

  function renderPayments() {
      mainContent.innerHTML = `
          <div class="row">
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Ingresos Totales (Hoy)</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">$1,285.00</div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-currency-dollar fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Transacciones (Hoy)</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">42</div>
                              </div>
                              <div class="col-auto">
                                  <i class="bi bi-receipt fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card shadow mb-4">
              <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Transacciones Recientes</h6>
              </div>
              <div class="card-body">
                  <div class="table-responsive">
                      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                              <tr>
                                  <th>ID Transacción</th>
                                  <th>Fecha</th>
                                  <th>Monto</th>
                                  <th>Método de Pago</th>
                                  <th>Estado</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>#T1234</td>
                                  <td>2023-05-20 14:35</td>
                                  <td>$35.97</td>
                                  <td>Tarjeta de Crédito</td>
                                  <td><span class="badge bg-success">Completado</span></td>
                              </tr>
                              <tr>
                                  <td>#T1235</td>
                                  <td>2023-05-20 15:20</td>
                                  <td>$22.99</td>
                                  <td>PayPal</td>
                                  <td><span class="badge bg-success">Completado</span></td>
                              </tr>
                              <tr>
                                  <td>#T1236</td>
                                  <td>2023-05-20 16:05</td>
                                  <td>$41.98</td>
                                  <td>Efectivo</td>
                                  <td><span class="badge bg-success">Completado</span></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      `;
  }

  function renderStats() {
      mainContent.innerHTML = `
          <div class="row">
              <div class="col-xl-6 col-lg-6">
                  <div class="card shadow mb-4">
                      <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">Ventas por Categoría</h6>
                      </div>
                      <div class="card-body">
                          <div class="chart-pie pt-4">
                              <canvas id="salesByCategoryChart"></canvas>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-6 col-lg-6">
                  <div class="card shadow mb-4">
                      <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">Pedidos por Hora</h6>
                      </div>
                      <div class="card-body">
                          <div class="chart-bar">
                              <canvas id="ordersByHourChart"></canvas>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-xl-12 col-lg-12">
                  <div class="card shadow mb-4">
                      <div class="card-header py-3">
                          <h6 class="m-0 font-weight-bold text-primary">Top 5 Platos Más Vendidos</h6>
                      </div>
                      <div class="card-body">
                          <div class="table-responsive">
                              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                  <thead>
                                      <tr>
                                          <th>Plato</th>
                                          <th>Categoría</th>
                                          <th>Cantidad Vendida</th>
                                          <th>Ingresos Generados</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>Hamburguesa Clásica</td>
                                          <td>Platos Principales</td>
                                          <td>145</td>
                                          <td>$1,593.55</td>
                                      </tr>
                                      <tr>
                                          <td>Pizza Margherita</td>
                                          <td>Platos Principales</td>
                                          <td>132</td>
                                          <td>$1,714.68</td>
                                      </tr>
                                      <tr>
                                          <td>Ensalada César</td>
                                          <td>Ensaladas</td>
                                          <td>98</td>
                                          <td>$881.02</td>
                                      </tr>
                                      <tr>
                                          <td>Tiramisú</td>
                                          <td>Postres</td>
                                          <td>87</td>
                                          <td>$695.13</td>
                                      </tr>
                                      <tr>
                                          <td>Sopa de Tomate</td>
                                          <td>Sopas</td>
                                          <td>76</td>
                                          <td>$531.24</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

      // Sales by Category Chart
      var ctx = document.getElementById("salesByCategoryChart");
      new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ["Platos Principales", "Ensaladas", "Postres", "Bebidas", "Sopas"],
              datasets: [{
                  data: [50, 20, 15, 10, 5],
                  backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
                  hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20a', '#be2617'],
                  hoverBorderColor: "rgba(234, 236, 244, 1)",
              }],
          },
          options: {
              maintainAspectRatio: false,
              tooltips: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  caretPadding: 10,
              },
              legend: {
                  display: false
              },
              cutoutPercentage: 80,
          },
      });

      // Orders by Hour Chart
      var ctx = document.getElementById("ordersByHourChart");
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
              datasets: [{
                  label: "Pedidos",
                  backgroundColor: "#4e73df",
                  hoverBackgroundColor: "#2e59d9",
                  borderColor: "#4e73df",
                  data: [15, 20, 25, 30, 35, 40, 50, 55, 45, 35, 25, 15],
              }],
          },
          options: {
              maintainAspectRatio: false,
              layout: {
                  padding: {
                      left: 10,
                      right: 25,
                      top: 25,
                      bottom: 0
                  }
              },
              scales: {
                  xAxes: [{
                      time: {
                          unit: 'hour'
                      },
                      gridLines: {
                          display: false,
                          drawBorder: false
                      },
                      ticks: {
                          maxTicksLimit: 12
                      },
                      maxBarThickness: 25,
                  }],
                  yAxes: [{
                      ticks: {
                          min: 0,
                          max: 60,
                          maxTicksLimit: 5,
                          padding: 10,
                      },
                      gridLines: {
                          color: "rgb(234, 236, 244)",
                          zeroLineColor: "rgb(234, 236, 244)",
                          drawBorder: false,
                          borderDash: [2],
                          zeroLineBorderDash: [2]
                      }
                  }],
              },
              legend: {
                  display: false
              },
              tooltips: {
                  titleMarginBottom: 10,
                  titleFontColor: '#6e707e',
                  titleFontSize: 14,
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  caretPadding: 10,
              },
          }
      });
  }

  function number_format(number, decimals, dec_point, thousands_sep) {
      // *     example: number_format(1234.56, 2, ',', ' ');
      // *     return: '1 234,56'
      number = (number + '').replace(',', '').replace(' ', '');
      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function(n, prec) {
              var k = Math.pow(10, prec);
              return '' + Math.round(n * k) / k;
          };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
  }
});