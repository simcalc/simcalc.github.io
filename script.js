const timelineData = [
  { day: 'Mon', title: 'Sprint Review', project: 'Website Redesign', time: '09:00', type: 'blue' },
  { day: 'Tue', title: 'QA Check', project: 'Mobile App', time: '11:30', type: 'green' },
  { day: 'Wed', title: 'Client Call', project: 'Branding', time: '14:00', type: 'purple' },
  { day: 'Thu', title: 'Design Sync', project: 'Marketing Deck', time: '16:30', type: 'orange' },
  { day: 'Fri', title: 'Launch Prep', project: 'CRM Rollout', time: '10:00', type: 'red' }
];

const taskData = [
  { title: 'Finalize landing page copy', project: 'Website', due: 'Today, 15:00', priority: 'high', color: 'blue' },
  { title: 'Sprint planning with product team', project: 'Mobile App', due: 'Tomorrow, 09:30', priority: 'medium', color: 'green' },
  { title: 'Client onboarding checklist', project: 'Operations', due: 'Wed, 12:00', priority: 'low', color: 'purple' },
  { title: 'Infrastructure review', project: 'Platform', due: 'Thu, 17:00', priority: 'high', color: 'orange' }
];

const milestoneData = [
  { name: 'Discovery phase', date: 'Feb 14', progress: 82, icon: 'D', tone: 'blue' },
  { name: 'Prototype validation', date: 'Feb 21', progress: 64, icon: 'P', tone: 'green' },
  { name: 'Launch preparation', date: 'Feb 28', progress: 49, icon: 'L', tone: 'purple' }
];

const teamData = [
  { name: 'Alicia Reed', role: 'Project Lead', load: 82, tone: 'blue' },
  { name: 'Daniel Kim', role: 'UI Designer', load: 68, tone: 'green' },
  { name: 'Mila Chen', role: 'Developer', load: 79, tone: 'orange' },
  { name: 'Owen Patel', role: 'QA Analyst', load: 54, tone: 'purple' }
];

const timelineEl = document.getElementById('timeline');
const taskListEl = document.getElementById('taskList');
const milestoneListEl = document.getElementById('milestoneList');
const teamListEl = document.getElementById('teamList');

function renderTimeline() {
  timelineEl.innerHTML = timelineData
    .map(
      (item) => `
        <article class="timeline-item ${item.type}">
          <small>${item.day}</small>
          <div>
            <h3>${item.title}</h3>
            <small>${item.project}</small>
          </div>
          <strong>${item.time}</strong>
        </article>
      `
    )
    .join('');
}

function renderTasks() {
  taskListEl.innerHTML = taskData
    .map(
      (task) => `
        <li class="task-item">
          <div class="task-main">
            <span class="task-dot ${task.color}"></span>
            <div>
              <strong>${task.title}</strong>
              <div class="task-meta">${task.project} • ${task.due}</div>
            </div>
          </div>
          <span class="task-badge ${task.priority}">${task.priority}</span>
        </li>
      `
    )
    .join('');
}

function renderMilestones() {
  milestoneListEl.innerHTML = milestoneData
    .map(
      (item) => `
        <div class="milestone-item">
          <div class="milestone-left">
            <div class="milestone-icon ${item.tone}">${item.icon}</div>
            <div class="milestone-content">
              <strong>${item.name}</strong>
              <small>Due ${item.date}</small>
            </div>
          </div>
          <div class="milestone-date">
            <div class="progress-bar"><span style="width: ${item.progress}%"></span></div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderTeam() {
  teamListEl.innerHTML = teamData
    .map(
      (member) => `
        <div class="team-member">
          <div class="member-info">
            <div class="member-avatar ${member.tone}">${member.name.split(' ').map((part) => part[0]).slice(0,2).join('')}</div>
            <div>
              <span class="member-name">${member.name}</span>
              <span class="member-role">${member.role}</span>
            </div>
          </div>
          <div class="member-load">
            <strong>${member.load}%</strong>
            <div class="progress-bar"><span style="width: ${member.load}%"></span></div>
          </div>
        </div>
      `
    )
    .join('');
}

renderTimeline();
renderTasks();
renderMilestones();
renderTeam();
