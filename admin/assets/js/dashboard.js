// Dashboard JavaScript

// Format date to DD-MM-YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
    
    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    // Initialize dashboard
    initDashboard();
    loadDashboardData();
});

// Initialize dashboard functionality
function initDashboard() {
    // Sidebar toggle for mobile
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    
    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            if (!sidebar.contains(e.target) && !toggleSidebar.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Make stat cards clickable
    document.querySelector('.stat-teachers').addEventListener('click', function() {
        document.querySelector('[data-section="teachers"]').click();
    });

    document.querySelector('.stat-students').addEventListener('click', function() {
        document.querySelector('[data-section="students"]').click();
    });

    document.querySelector('.stat-demo').addEventListener('click', function() {
        document.querySelector('[data-section="freedemo"]').click();
    });
}

// Load dashboard data (mock data for now, will be replaced with DB queries)
function loadDashboardData() {
    // Mock data - Replace with actual database queries later
    const mockData = {
        teachers: [
            {
                id: 1,
                fullName: 'John Doe',
                qualification: 'Master\'s Degree',
                subjects: 'Mathematics',
                experience: '5 years',
                email: 'john.doe@example.com',
                phone: '+91 9876543210',
                date: formatDate('2024-12-20')
            },
            {
                id: 2,
                fullName: 'Jane Smith',
                qualification: 'Bachelor\'s Degree',
                subjects: 'English',
                experience: '3 years',
                email: 'jane.smith@example.com',
                phone: '+91 9876543211',
                date: formatDate('2024-12-21')
            }
        ],
        students: [
            {
                id: 1,
                studentName: 'Alex Kumar',
                parentName: 'Raj Kumar',
                grade: '10th',
                subject: 'Mathematics',
                email: 'alex.kumar@example.com',
                phone: '+91 9876543212',
                date: formatDate('2024-12-22')
            },
            {
                id: 2,
                studentName: 'Priya Singh',
                parentName: 'Amit Singh',
                grade: '12th',
                subject: 'Physics',
                email: 'priya.singh@example.com',
                phone: '+91 9876543213',
                date: formatDate('2024-12-22')
            }
        ],
        freedemo: [
            {
                id: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                phone: '+91 9876543214',
                subject: 'Chemistry',
                grade: '11th',
                preferredDate: formatDate('2024-12-28'),
                date: formatDate('2024-12-23')
            },
            {
                id: 2,
                name: 'Sneha Patel',
                email: 'sneha.patel@example.com',
                phone: '+91 9876543215',
                subject: 'Biology',
                grade: '9th',
                preferredDate: formatDate('2024-12-29'),
                date: formatDate('2024-12-23')
            }
        ]
    };

    // Update counts
    document.getElementById('teacherCount').textContent = mockData.teachers.length;
    document.getElementById('studentCount').textContent = mockData.students.length;
    document.getElementById('demoCount').textContent = mockData.freedemo.length;

    // Load tables
    loadTeachersTable(mockData.teachers);
    loadStudentsTable(mockData.students);
    loadDemoTable(mockData.freedemo);

    // Load recent activity
    loadRecentActivity(mockData);
}

// Load teachers table
function loadTeachersTable(data) {
    const tbody = document.querySelector('#teachersTable tbody');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No data available</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((teacher, index) => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.fullName}</td>
            <td>${teacher.qualification}</td>
            <td>${teacher.subjects}</td>
            <td>${teacher.experience}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.date}</td>
            <td>
                <button class="btn btn-sm btn-info view-btn" data-index="${index}" data-type="teacher">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord('teacher', ${teacher.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Store data for access by event listeners
    window.teachersData = data;
    
    // Attach event listeners to view buttons
    tbody.querySelectorAll('.view-btn[data-type="teacher"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            viewDetails(window.teachersData[index], 'teacher');
        });
    });
}

// Load students table
function loadStudentsTable(data) {
    const tbody = document.querySelector('#studentsTable tbody');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No data available</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((student, index) => `
        <tr>
            <td>${student.id}</td>
            <td>${student.studentName}</td>
            <td>${student.parentName}</td>
            <td>${student.grade}</td>
            <td>${student.subject}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.date}</td>
            <td>
                <button class="btn btn-sm btn-info view-btn" data-index="${index}" data-type="student">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord('student', ${student.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Store data for access by event listeners
    window.studentsData = data;
    
    // Attach event listeners to view buttons
    tbody.querySelectorAll('.view-btn[data-type="student"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            viewDetails(window.studentsData[index], 'student');
        });
    });
}

// Load demo table
function loadDemoTable(data) {
    const tbody = document.querySelector('#demoTable tbody');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No data available</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((demo, index) => `
        <tr>
            <td>${demo.id}</td>
            <td>${demo.name}</td>
            <td>${demo.email}</td>
            <td>${demo.phone}</td>
            <td>${demo.subject}</td>
            <td>${demo.grade}</td>
            <td>${demo.preferredDate}</td>
            <td>${demo.date}</td>
            <td>
                <button class="btn btn-sm btn-info view-btn" data-index="${index}" data-type="demo">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord('demo', ${demo.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Store data for access by event listeners
    window.demoData = data;
    
    // Attach event listeners to view buttons
    tbody.querySelectorAll('.view-btn[data-type="demo"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            viewDetails(window.demoData[index], 'demo');
        });
    });
}

// Load recent activity
function loadRecentActivity(data) {
    const recentActivity = document.getElementById('recentActivity');
    const allData = [
        ...data.teachers.map(t => ({ type: 'Teacher', name: t.fullName, date: t.date })),
        ...data.students.map(s => ({ type: 'Student', name: s.studentName, date: s.date })),
        ...data.freedemo.map(d => ({ type: 'Demo', name: d.name, date: d.date }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    if (allData.length === 0) {
        recentActivity.innerHTML = '<p class="text-muted">No recent activity</p>';
        return;
    }

    recentActivity.innerHTML = allData.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
            <div>
                <strong>${item.type} Registration:</strong> ${item.name}
            </div>
            <small class="text-muted">${item.date}</small>
        </div>
    `).join('');
}

// View details in modal
function viewDetails(data, type) {
    const modalElement = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');
    
    let detailsHtml = '<div class="modal-details-list">';
    
    for (const [key, value] of Object.entries(data)) {
        detailsHtml += `
            <div class="detail-row">
                <strong class="detail-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong>
                <span class="detail-value">${value}</span>
            </div>
        `;
    }
    
    detailsHtml += '</div>';
    modalBody.innerHTML = detailsHtml;
    
    // Use Bootstrap's data API to show modal - prevents aria-hidden conflicts
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

// Delete record
function deleteRecord(type, id) {
    if (confirm('Are you sure you want to delete this record?')) {
        // This will be replaced with actual database deletion
        console.log(`Deleting ${type} record with ID: ${id}`);
        alert('This feature will be implemented with database integration');
    }
}

// Export data
function exportData(type) {
    // This will be replaced with actual export functionality
    console.log(`Exporting ${type} data`);
    alert('Export feature will be implemented with database integration');
}
