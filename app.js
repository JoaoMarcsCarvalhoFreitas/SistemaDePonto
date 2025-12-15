// ============================================
// PONTO DIGITAL SERVIDOR - APPLICATION LOGIC
// ============================================

/**
 * Data Service - Manages localStorage operations
 */
class DataService {
  constructor() {
    this.STORAGE_KEYS = {
      users: 'ponto_users',
      records: 'ponto_records',
      session: 'ponto_session'
    };
    this.initializeData();
  }

  /**
   * Initialize localStorage with seed data if empty
   */
  initializeData() {
    if (!localStorage.getItem(this.STORAGE_KEYS.users)) {
      const users = [
        { matricula: '1001', nome: 'João Silva', role: 'employee', senha: '1234' },
        { matricula: '1002', nome: 'Maria Santos', role: 'employee', senha: '1234' },
        { matricula: '1003', nome: 'Pedro Costa', role: 'employee', senha: '1234' },
        { matricula: '1004', nome: 'Ana Oliveira', role: 'employee', senha: '1234' },
        { matricula: '1005', nome: 'Carlos Souza', role: 'employee', senha: '1234' },
        { matricula: '9999', nome: 'Administrador', role: 'admin', senha: '1234' }
      ];
      localStorage.setItem(this.STORAGE_KEYS.users, JSON.stringify(users));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.records)) {
      // Generate sample records for the last 7 days
      const records = this.generateSampleRecords();
      localStorage.setItem(this.STORAGE_KEYS.records, JSON.stringify(records));
    }
  }

  /**
   * Generate sample records for testing
   */
  generateSampleRecords() {
    const records = [];
    const employees = ['1001', '1002', '1003', '1004', '1005'];
    const now = new Date();

    for (let day = 0; day < 7; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() - day);
      
      employees.forEach(matricula => {
        // Morning entry (8-9 AM)
        const entradaTime = new Date(date);
        entradaTime.setHours(8, Math.floor(Math.random() * 60), 0, 0);
        
        records.push({
          id: this.generateUUID(),
          matricula,
          timestamp: entradaTime.toISOString(),
          tipo: 'entrada',
          date: this.formatDate(entradaTime),
          time: this.formatTime(entradaTime)
        });

        // Lunch break (12-1 PM)
        const saidaAlmocoTime = new Date(date);
        saidaAlmocoTime.setHours(12, Math.floor(Math.random() * 30), 0, 0);
        
        records.push({
          id: this.generateUUID(),
          matricula,
          timestamp: saidaAlmocoTime.toISOString(),
          tipo: 'saida',
          date: this.formatDate(saidaAlmocoTime),
          time: this.formatTime(saidaAlmocoTime)
        });

        // Return from lunch (1-2 PM)
        const entradaAlmocoTime = new Date(date);
        entradaAlmocoTime.setHours(13, Math.floor(Math.random() * 60), 0, 0);
        
        records.push({
          id: this.generateUUID(),
          matricula,
          timestamp: entradaAlmocoTime.toISOString(),
          tipo: 'entrada',
          date: this.formatDate(entradaAlmocoTime),
          time: this.formatTime(entradaAlmocoTime)
        });

        // Evening exit (5-6 PM)
        const saidaTime = new Date(date);
        saidaTime.setHours(17, Math.floor(Math.random() * 60), 0, 0);
        
        records.push({
          id: this.generateUUID(),
          matricula,
          timestamp: saidaTime.toISOString(),
          tipo: 'saida',
          date: this.formatDate(saidaTime),
          time: this.formatTime(saidaTime)
        });
      });
    }

    return records;
  }

  /**
   * Generate UUID v4
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Format date as YYYY-MM-DD
   */
  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Format time as HH:MM:SS
   */
  formatTime(date) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Format date for display (DD/MM/YYYY)
   */
  formatDateDisplay(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  /**
   * Get all users
   */
  getUsers() {
    const users = localStorage.getItem(this.STORAGE_KEYS.users);
    return users ? JSON.parse(users) : [];
  }

  /**
   * Get user by matricula
   */
  getUserByMatricula(matricula) {
    const users = this.getUsers();
    return users.find(u => u.matricula === matricula);
  }

  /**
   * Authenticate user
   */
  authenticate(matricula, senha) {
    const user = this.getUserByMatricula(matricula);
    if (user && user.senha === senha) {
      const session = {
        matricula: user.matricula,
        nome: user.nome,
        role: user.role
      };
      sessionStorage.setItem(this.STORAGE_KEYS.session, JSON.stringify(session));
      return session;
    }
    return null;
  }

  /**
   * Get current session
   */
  getCurrentSession() {
    const session = sessionStorage.getItem(this.STORAGE_KEYS.session);
    return session ? JSON.parse(session) : null;
  }

  /**
   * Logout
   */
  logout() {
    sessionStorage.removeItem(this.STORAGE_KEYS.session);
  }

  /**
   * Get all records
   */
  getRecords() {
    const records = localStorage.getItem(this.STORAGE_KEYS.records);
    return records ? JSON.parse(records) : [];
  }

  /**
   * Get records by matricula
   */
  getRecordsByMatricula(matricula, startDate = null, endDate = null) {
    let records = this.getRecords().filter(r => r.matricula === matricula);
    
    if (startDate) {
      records = records.filter(r => r.date >= startDate);
    }
    
    if (endDate) {
      records = records.filter(r => r.date <= endDate);
    }
    
    return records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Get all records with filters
   */
  getAllRecords(matricula = null, startDate = null, endDate = null) {
    let records = this.getRecords();
    
    if (matricula) {
      records = records.filter(r => r.matricula === matricula);
    }
    
    if (startDate) {
      records = records.filter(r => r.date >= startDate);
    }
    
    if (endDate) {
      records = records.filter(r => r.date <= endDate);
    }
    
    return records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Get last record for user
   */
  getLastRecord(matricula) {
    const records = this.getRecordsByMatricula(matricula);
    return records.length > 0 ? records[0] : null;
  }

  /**
   * Add new record
   */
  addRecord(matricula) {
    const now = new Date();
    const lastRecord = this.getLastRecord(matricula);
    
    // Determine next action type
    let tipo = 'entrada';
    if (lastRecord) {
      tipo = lastRecord.tipo === 'entrada' ? 'saida' : 'entrada';
    }
    
    const newRecord = {
      id: this.generateUUID(),
      matricula,
      timestamp: now.toISOString(),
      tipo,
      date: this.formatDate(now),
      time: this.formatTime(now)
    };
    
    const records = this.getRecords();
    records.push(newRecord);
    localStorage.setItem(this.STORAGE_KEYS.records, JSON.stringify(records));
    
    return newRecord;
  }

  /**
   * Get statistics
   */
  getStatistics() {
    const records = this.getRecords();
    const users = this.getUsers().filter(u => u.role === 'employee');
    const today = this.formatDate(new Date());
    const thisMonth = today.substring(0, 7); // YYYY-MM
    
    return {
      totalRecords: records.length,
      totalEmployees: users.length,
      todayRecords: records.filter(r => r.date === today).length,
      monthRecords: records.filter(r => r.date.startsWith(thisMonth)).length
    };
  }
}

/**
 * UI Controller - Manages views and user interactions
 */
class UIController {
  constructor(dataService) {
    this.dataService = dataService;
    this.currentView = 'login';
    this.init();
  }

  /**
   * Initialize UI
   */
  init() {
    this.setupEventListeners();
    this.checkSession();
  }

  /**
   * Check if user is already logged in
   */
  checkSession() {
    const session = this.dataService.getCurrentSession();
    if (session) {
      this.showDashboard(session);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => this.handleLogin(e));

    // Ponto button
    const pontoBtn = document.getElementById('ponto-btn');
    pontoBtn.addEventListener('click', () => this.handlePontoClick());

    // Navigation buttons
    const navButtons = document.querySelectorAll('[data-view]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => this.switchView(btn.dataset.view));
    });

    // Logout buttons
    const logoutButtons = ['logout-btn', 'logout-btn-timesheet', 'logout-btn-admin'];
    logoutButtons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => this.handleLogout());
      }
    });

    // Timesheet filters
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    applyFiltersBtn.addEventListener('click', () => this.loadTimesheet());

    // Admin filters
    const adminApplyFiltersBtn = document.getElementById('admin-apply-filters-btn');
    adminApplyFiltersBtn.addEventListener('click', () => this.loadAdminRecords());

    // Export buttons
    const exportCsvBtn = document.getElementById('export-csv-btn');
    exportCsvBtn.addEventListener('click', () => this.exportToCSV());

    const exportJsonBtn = document.getElementById('export-json-btn');
    exportJsonBtn.addEventListener('click', () => this.exportToJSON());
  }

  /**
   * Handle login
   */
  handleLogin(e) {
    e.preventDefault();
    
    const matricula = document.getElementById('login-matricula').value.trim();
    const senha = document.getElementById('login-senha').value;
    
    const session = this.dataService.authenticate(matricula, senha);
    
    if (session) {
      this.hideError('login-error');
      this.showDashboard(session);
    } else {
      this.showError('login-error', 'Matrícula ou senha inválidos');
    }
  }

  /**
   * Handle logout
   */
  handleLogout() {
    this.dataService.logout();
    this.switchView('login');
    document.getElementById('login-form').reset();
  }

  /**
   * Show dashboard
   */
  showDashboard(session) {
    // Update header info
    document.getElementById('header-user-name').textContent = session.nome;
    document.getElementById('header-user-matricula').textContent = `Mat: ${session.matricula}`;
    document.getElementById('timesheet-user-name').textContent = session.nome;
    document.getElementById('admin-user-name').textContent = session.nome;

    // Show/hide admin navigation based on role
    const adminNavBtns = [
      document.getElementById('admin-nav-btn'),
      document.getElementById('admin-nav-btn-timesheet')
    ];
    
    adminNavBtns.forEach(btn => {
      if (btn) {
        btn.style.display = session.role === 'admin' ? 'flex' : 'none';
      }
    });

    // Update ponto button state
    this.updatePontoButton(session.matricula);

    // Show dashboard
    this.switchView('dashboard');
  }

  /**
   * Update ponto button based on last record
   */
  updatePontoButton(matricula) {
    const lastRecord = this.dataService.getLastRecord(matricula);
    const pontoBtn = document.getElementById('ponto-btn');
    const btnText = document.getElementById('ponto-btn-text');
    
    if (lastRecord) {
      // Update last record display
      this.showLastRecord(lastRecord);
      
      // Determine next action
      if (lastRecord.tipo === 'entrada') {
        pontoBtn.dataset.nextAction = 'saida';
        btnText.textContent = 'REGISTRAR SAÍDA';
        pontoBtn.className = 'btn btn-hero btn-danger';
      } else {
        pontoBtn.dataset.nextAction = 'entrada';
        btnText.textContent = 'REGISTRAR ENTRADA';
        pontoBtn.className = 'btn btn-hero btn-success';
      }
    } else {
      // No records yet
      pontoBtn.dataset.nextAction = 'entrada';
      btnText.textContent = 'REGISTRAR ENTRADA';
      pontoBtn.className = 'btn btn-hero btn-success';
      document.getElementById('last-record-display').classList.add('hidden');
    }
  }

  /**
   * Show last record
   */
  showLastRecord(record) {
    const display = document.getElementById('last-record-display');
    const timeEl = document.getElementById('last-record-time');
    const dateEl = document.getElementById('last-record-date');
    const badgeEl = document.getElementById('last-record-badge');
    
    timeEl.textContent = record.time;
    dateEl.textContent = this.dataService.formatDateDisplay(record.date);
    badgeEl.textContent = record.tipo.toUpperCase();
    badgeEl.className = `badge badge-${record.tipo}`;
    
    display.classList.remove('hidden');
  }

  /**
   * Handle ponto button click
   */
  handlePontoClick() {
    const session = this.dataService.getCurrentSession();
    if (!session) return;

    const newRecord = this.dataService.addRecord(session.matricula);
    
    // Show feedback
    const feedbackEl = document.getElementById('dashboard-feedback');
    const feedbackMsg = document.getElementById('dashboard-feedback-message');
    feedbackMsg.innerHTML = `<strong>✅ Ponto registrado com sucesso!</strong><br>${newRecord.tipo.toUpperCase()} às ${newRecord.time}`;
    feedbackEl.classList.remove('hidden');
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      feedbackEl.classList.add('hidden');
    }, 3000);

    // Update button state
    this.updatePontoButton(session.matricula);
  }

  /**
   * Load timesheet
   */
  loadTimesheet() {
    const session = this.dataService.getCurrentSession();
    if (!session) return;

    const startDate = document.getElementById('filter-date-start').value;
    const endDate = document.getElementById('filter-date-end').value;

    const records = this.dataService.getRecordsByMatricula(
      session.matricula,
      startDate || null,
      endDate || null
    );

    const tbody = document.getElementById('timesheet-table-body');
    
    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-muted">
            Nenhum registro encontrado
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = records.map(record => `
      <tr>
        <td>${this.dataService.formatDateDisplay(record.date)}</td>
        <td>${record.time}</td>
        <td><span class="badge badge-${record.tipo}">${record.tipo.toUpperCase()}</span></td>
      </tr>
    `).join('');
  }

  /**
   * Load admin records
   */
  loadAdminRecords() {
    const matricula = document.getElementById('admin-filter-employee').value;
    const startDate = document.getElementById('admin-date-start').value;
    const endDate = document.getElementById('admin-date-end').value;

    const records = this.dataService.getAllRecords(
      matricula || null,
      startDate || null,
      endDate || null
    );

    const tbody = document.getElementById('admin-table-body');
    
    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted">
            Nenhum registro encontrado
          </td>
        </tr>
      `;
      return;
    }

    const users = this.dataService.getUsers();
    
    tbody.innerHTML = records.map(record => {
      const user = users.find(u => u.matricula === record.matricula);
      return `
        <tr>
          <td>${record.matricula}</td>
          <td>${user ? user.nome : 'N/A'}</td>
          <td>${this.dataService.formatDateDisplay(record.date)}</td>
          <td>${record.time}</td>
          <td><span class="badge badge-${record.tipo}">${record.tipo.toUpperCase()}</span></td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Load admin statistics
   */
  loadAdminStats() {
    const stats = this.dataService.getStatistics();
    
    document.getElementById('stat-total-records').textContent = stats.totalRecords;
    document.getElementById('stat-total-employees').textContent = stats.totalEmployees;
    document.getElementById('stat-today-records').textContent = stats.todayRecords;
    document.getElementById('stat-month-records').textContent = stats.monthRecords;
  }

  /**
   * Populate employee dropdown
   */
  populateEmployeeDropdown() {
    const users = this.dataService.getUsers().filter(u => u.role === 'employee');
    const select = document.getElementById('admin-filter-employee');
    
    const options = users.map(user => 
      `<option value="${user.matricula}">${user.nome} (${user.matricula})</option>`
    ).join('');
    
    select.innerHTML = `<option value="">Todos os Servidores</option>${options}`;
  }

  /**
   * Export to CSV
   */
  exportToCSV() {
    const matricula = document.getElementById('admin-filter-employee').value;
    const startDate = document.getElementById('admin-date-start').value;
    const endDate = document.getElementById('admin-date-end').value;

    const records = this.dataService.getAllRecords(
      matricula || null,
      startDate || null,
      endDate || null
    );

    const users = this.dataService.getUsers();

    // CSV header
    let csv = 'Matrícula,Nome,Data,Hora,Tipo\n';

    // CSV rows
    records.forEach(record => {
      const user = users.find(u => u.matricula === record.matricula);
      csv += `${record.matricula},${user ? user.nome : 'N/A'},${record.date},${record.time},${record.tipo}\n`;
    });

    // Download
    this.downloadFile(csv, 'relatorio-ponto.csv', 'text/csv');
  }

  /**
   * Export to JSON
   */
  exportToJSON() {
    const matricula = document.getElementById('admin-filter-employee').value;
    const startDate = document.getElementById('admin-date-start').value;
    const endDate = document.getElementById('admin-date-end').value;

    const records = this.dataService.getAllRecords(
      matricula || null,
      startDate || null,
      endDate || null
    );

    const users = this.dataService.getUsers();

    // Enrich records with user names
    const enrichedRecords = records.map(record => {
      const user = users.find(u => u.matricula === record.matricula);
      return {
        ...record,
        nome: user ? user.nome : 'N/A'
      };
    });

    const json = JSON.stringify(enrichedRecords, null, 2);

    // Download
    this.downloadFile(json, 'relatorio-ponto.json', 'application/json');
  }

  /**
   * Download file
   */
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Switch view
   */
  switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });

    // Show selected view
    const selectedView = document.getElementById(`${viewName}-view`);
    if (selectedView) {
      selectedView.classList.add('active');
      this.currentView = viewName;
    }

    // Update navigation active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      }
    });

    // Load data for specific views
    if (viewName === 'timesheet') {
      this.setDefaultDateFilters('filter-date-start', 'filter-date-end');
      this.loadTimesheet();
    } else if (viewName === 'admin') {
      this.setDefaultDateFilters('admin-date-start', 'admin-date-end');
      this.populateEmployeeDropdown();
      this.loadAdminStats();
      this.loadAdminRecords();
    }
  }

  /**
   * Set default date filters (last 30 days)
   */
  setDefaultDateFilters(startInputId, endInputId) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    document.getElementById(startInputId).value = this.dataService.formatDate(startDate);
    document.getElementById(endInputId).value = this.dataService.formatDate(endDate);
  }

  /**
   * Show error message
   */
  showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    const messageEl = document.getElementById(`${elementId}-message`);
    
    if (messageEl) {
      messageEl.textContent = message;
    }
    errorEl.classList.remove('hidden');
  }

  /**
   * Hide error message
   */
  hideError(elementId) {
    const errorEl = document.getElementById(elementId);
    errorEl.classList.add('hidden');
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const dataService = new DataService();
  const uiController = new UIController(dataService);
  
  console.log('✅ Ponto Digital Servidor initialized');
  console.log('📊 Total users:', dataService.getUsers().length);
  console.log('📋 Total records:', dataService.getRecords().length);
});
