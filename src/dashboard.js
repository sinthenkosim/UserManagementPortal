// Load Google Charts ONCE
google.charts.load('current', { packages: ['corechart'] });

fetch('/USerManagementPortal/api/employees.php')
  .then(res => res.json())
  .then(data => {

    const employees = Array.isArray(data)
      ? data
      : data.data || data.employees || [];

    if (!employees.length) return;

    /* ===============================
       TOTAL EMPLOYEES
    =============================== */
    const totalEmployeesEl = document.getElementById('totalEmployees');
    if (totalEmployeesEl) {
      totalEmployeesEl.textContent = employees.length;
    }

    /* ===============================
       COUNT PER DEPARTMENT
    =============================== */
    const deptCounts = {};
    employees.forEach(emp => {
      const dept = emp.department || "Unknown";
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });

	const numberOfDepartments = Object.keys(deptCounts).length;
	const deptSet = new Set();

	employees.forEach(emp => {
	  deptSet.add(emp.department || "Unknown");
	});

	
	document.getElementById("depCounts").textContent = numberOfDepartments;
	
    const labels = Object.keys(deptCounts);
    const values = Object.values(deptCounts);

    /* ===============================
       LINE CHART (Chart.js)
    =============================== */
    new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Employees",
          data: values,
          borderColor: "rgba(0,123,255,0.8)",
          backgroundColor: "rgba(0,123,255,0.2)",
          fill: false
        }]
      },
      options: { responsive: true }
    });

    /* ===============================
       PIE CHART (Google Charts)
       NO LABELS
    =============================== */
	google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const pieData = [['Department', 'Employees']];
      Object.entries(deptCounts).forEach(([d, c]) => pieData.push([d, c]));

      const dataTable = google.visualization.arrayToDataTable(pieData);

      const options = {
        pieSliceText: 'none',
        legend: { position: 'right' }
      };

      const chart = new google.visualization.PieChart(
        document.getElementById('pieChart')
      );
      chart.draw(dataTable, options);
    });

  })
  .catch(err => console.error("Error fetching employees:", err));
