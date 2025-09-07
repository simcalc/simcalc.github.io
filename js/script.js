// Mobile Menu for Sidebar
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('activity-sidebar');
const overlay = document.getElementById('sidebar-overlay');

function openMobileMenu() {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
    menuToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from reaching main content
    sidebar.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
});

overlay.addEventListener('click', closeMobileMenu);


// --- ACTIVITY SWITCHER LOGIC ---
const sidebarBtns = document.querySelectorAll('.sidebar-btn');
const activityContents = document.querySelectorAll('.activity-content');
const navMenu = document.getElementById('nav-menu');

const navLinksMap = {
    'activity-unloading': [
        { href: '#prasyarat-unloading', text: 'A) Prasyarat' },
        { href: '#metode-unloading', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-unloading', text: 'C) Risk Assessment' },
        { href: '#peran-unloading', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-unloading', text: 'E) Checklist' }
    ],
    'activity-movement': [
        { href: '#prasyarat-movement', text: 'A) Prasyarat' },
        { href: '#metode-movement', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-movement', text: 'C) Risk Assessment' },
        { href: '#peran-movement', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-movement', text: 'E) Checklist' }
    ],
    'activity-drilling': [
        { href: '#prasyarat-drilling', text: 'A) Prasyarat' },
        { href: '#metode-drilling', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-drilling', text: 'C) Risk Assessment' },
        { href: '#peran-drilling', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-drilling', text: 'E) Checklist' }
    ],
     'activity-preboring': [
        { href: '#prasyarat-preboring', text: 'A) Prasyarat' },
        { href: '#metode-preboring', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-preboring', text: 'C) Risk Assessment' },
        { href: '#peran-preboring', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-preboring', text: 'E) Checklist' }
    ],
    'activity-lifting': [
        { href: '#prasyarat-lifting', text: 'A) Prasyarat' },
        { href: '#metode-lifting', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-lifting', text: 'C) Risk Assessment' },
        { href: '#peran-lifting', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-lifting', text: 'E) Checklist' }
    ],
    'activity-casing': [
        { href: '#prasyarat-casing', text: 'A) Prasyarat' },
        { href: '#metode-casing', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-casing', text: 'C) Risk Assessment' },
        { href: '#peran-casing', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-casing', text: 'E) Checklist' }
    ],
    'activity-refueling': [
        { href: '#prasyarat-refueling', text: 'A) Prasyarat' },
        { href: '#metode-refueling', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-refueling', text: 'C) Risk Assessment' },
        { href: '#peran-refueling', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-refueling', text: 'E) Checklist' }
    ],
    'activity-maintenance': [
        { href: '#prasyarat-maintenance', text: 'A) Prasyarat' },
        { href: '#metode-maintenance', text: 'B) Metode Kerja' },
        { href: '#risk-assessment-maintenance', text: 'C) Risk Assessment' },
        { href: '#peran-maintenance', text: 'D) Peran & Verifikasi' },
        { href: '#checklist-maintenance', text: 'E) Checklist' }
    ]
};

function updateNavMenu(activityId) {
    navMenu.innerHTML = '';
    const links = navLinksMap[activityId] || [];
    links.forEach(linkInfo => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = linkInfo.href;
        a.textContent = linkInfo.text;
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sidebarBtns.forEach(b => b.classList.remove('active'));
        activityContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        updateNavMenu(targetId);

        if (window.innerWidth <= 992) {
            closeMobileMenu();
        }
    });
});

// Initial nav menu setup
updateNavMenu('activity-unloading');


// --- REFACTORED & REUSABLE: INTERACTIVE RISK ASSESSMENT LOGIC ---
const modal = document.getElementById('riskMatrixModal');
const riskModalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
let currentTargetCell = null;

function updateCellColor(cell, value) {
    cell.classList.remove('risk-low', 'risk-medium', 'risk-high', 'risk-extreme');
    if (value >= 17) {
        cell.classList.add('risk-extreme');
    } else if (value >= 10) {
        cell.classList.add('risk-high');
    } else if (value >= 5) {
        cell.classList.add('risk-medium');
    } else {
        cell.classList.add('risk-low');
    }
}

function openRiskModal(target) {
    currentTargetCell = target;
    modal.style.display = 'block';
    riskModalOverlay.style.display = 'block';
}

function closeRiskModal() {
    modal.style.display = 'none';
    riskModalOverlay.style.display = 'none';
    currentTargetCell = null;
}

document.querySelector('.risk-matrix-table').addEventListener('click', function(e) {
    if (e.target && e.target.matches('td[data-value]')) {
        const selectedValue = e.target.getAttribute('data-value');
        if (currentTargetCell) {
            currentTargetCell.textContent = selectedValue;
            updateCellColor(currentTargetCell, parseInt(selectedValue));
        }
        closeRiskModal();
    }
});

closeModalBtn.addEventListener('click', closeRiskModal);
riskModalOverlay.addEventListener('click', closeRiskModal);

// REVIEW: Added event listener for the Escape key to close the modal for better accessibility.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeRiskModal();
    }
});

function setupRiskAssessmentInteraction(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener('click', (e) => {
         const targetCell = e.target.closest('div.risk-level[data-editable="true"]');
         if(targetCell) openRiskModal(targetCell);
    });

    container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const targetCell = e.target.closest('div.risk-level[data-editable="true"]');
            if (targetCell) {
                e.preventDefault();
                openRiskModal(targetCell);
            }
        }
    });

    container.querySelectorAll('.add-row-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetTableId = this.getAttribute('data-target-table');
            const tableBody = document.getElementById(targetTableId);
            if (tableBody) {
                const rowCount = tableBody.rows.length;
                const newRow = tableBody.insertRow();
                let newRowHTML = '';

                // Check how many columns the table header has to determine the new row structure
                const columnCount = tableBody.previousElementSibling.rows[0].cells.length;

                if (columnCount === 8) { // For tables with 8 columns
                    newRowHTML = `
                        <td>${rowCount + 1}</td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td><div class="risk-level risk-low" data-editable="true" tabindex="0" role="button">1</div></td>
                        <td><div class="risk-level risk-low" data-editable="true" tabindex="0" role="button">1</div></td>
                        <td contenteditable="true"></td>
                    `;
                } else { // Default logic for tables with 6 columns
                    newRowHTML = `
                        <td>${rowCount + 1}</td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td><div class="risk-level risk-low" data-editable="true" tabindex="0" role="button">1</div></td>
                        <td><div class="risk-level risk-low" data-editable="true" tabindex="0" role="button">1</div></td>
                    `;
                }
                newRow.innerHTML = newRowHTML;
            }
        });
    });
    
    container.querySelectorAll('.risk-level[data-editable="true"]').forEach(cell => {
        const value = parseInt(cell.textContent);
        updateCellColor(cell, value);
    });
}

// Initialize interactions for all activities
const activityIds = ['activity-unloading', 'activity-movement', 'activity-drilling', 'activity-preboring', 'activity-lifting', 'activity-casing', 'activity-refueling', 'activity-maintenance'];
activityIds.forEach(id => setupRiskAssessmentInteraction(id));
