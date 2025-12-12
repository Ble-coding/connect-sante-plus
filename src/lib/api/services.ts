import apiClient from './client';

// Service pour les utilisateurs
export const userService = {
  getCurrentUser: () => apiClient.get('/accounts/users/me/'),
  updateProfile: (data: any) => apiClient.patch('/accounts/users/me/', data),
  getDoctors: () => apiClient.get('/accounts/users/doctors/'),
  getPharmacists: () => apiClient.get('/accounts/users/pharmacists/'),
};

// Service pour les pharmacies
export const pharmacyService = {
  getAll: (params?: any) => apiClient.get('/pharmacies/pharmacies/', { params }),
  getById: (id: number) => apiClient.get(`/pharmacies/pharmacies/${id}/`),
  search: (params: { latitude?: number; longitude?: number; medication?: string; city?: string }) =>
    apiClient.get('/pharmacies/pharmacies/search/', { params }),
  getInventory: (id: number) => apiClient.get(`/pharmacies/pharmacies/${id}/inventory/`),
  checkMedication: (pharmacyId: number, medicationId: number) =>
    apiClient.post(`/pharmacies/pharmacies/${pharmacyId}/check_medication/`, { medication_id: medicationId }),
};

// Service pour les rendez-vous
export const appointmentService = {
  getAll: (params?: any) => apiClient.get('/consultations/appointments/', { params }),
  getById: (id: number) => apiClient.get(`/consultations/appointments/${id}/`),
  create: (data: any) => apiClient.post('/consultations/appointments/', data),
  update: (id: number, data: any) => apiClient.patch(`/consultations/appointments/${id}/`, data),
  confirm: (id: number) => apiClient.post(`/consultations/appointments/${id}/confirm/`),
  cancel: (id: number) => apiClient.post(`/consultations/appointments/${id}/cancel/`),
  startConsultation: (id: number, data?: any) =>
    apiClient.post(`/consultations/appointments/${id}/start_consultation/`, data),
  completeConsultation: (id: number, data: any) =>
    apiClient.post(`/consultations/appointments/${id}/complete_consultation/`, data),
};

// Service pour les ordonnances
export const prescriptionService = {
  getAll: (params?: any) => apiClient.get('/prescriptions/prescriptions/', { params }),
  getById: (id: number) => apiClient.get(`/prescriptions/prescriptions/${id}/`),
  getActive: () => apiClient.get('/prescriptions/prescriptions/active/'),
  getCompleted: () => apiClient.get('/prescriptions/prescriptions/completed/'),
  complete: (id: number) => apiClient.post(`/prescriptions/prescriptions/${id}/complete/`),
};

// Service pour les médicaments
export const medicationService = {
  getAll: (params?: any) => apiClient.get('/medications/medications/', { params }),
  getById: (id: number) => apiClient.get(`/medications/medications/${id}/`),
  search: (query: string) => apiClient.get('/medications/medications/', { params: { search: query } }),
};

// Service pour les médicaments patients
export const patientMedicationService = {
  getAll: (params?: any) => apiClient.get('/medications/patient-medications/', { params }),
  getById: (id: number) => apiClient.get(`/medications/patient-medications/${id}/`),
  getActive: () => apiClient.get('/medications/patient-medications/active/'),
  getTodaySchedule: () => apiClient.get('/medications/patient-medications/today_schedule/'),
  create: (data: any) => apiClient.post('/medications/patient-medications/', data),
  update: (id: number, data: any) => apiClient.patch(`/medications/patient-medications/${id}/`, data),
  markDoseTaken: (id: number, doseId: number) => 
    apiClient.post(`/medications/patient-medications/${id}/mark_dose_taken/`, { dose_id: doseId }),
  toggleReminders: (id: number) => apiClient.post(`/medications/patient-medications/${id}/toggle_reminders/`),
  stop: (id: number) => apiClient.post(`/medications/patient-medications/${id}/stop/`),
};

// Service pour les messages
export const messageService = {
  getAll: (params?: any) => apiClient.get('/messaging/messages/', { params }),
  getSent: () => apiClient.get('/messaging/messages/sent/'),
  getReceived: () => apiClient.get('/messaging/messages/received/'),
  create: (data: any) => apiClient.post('/messaging/messages/', data),
  markRead: (id: number) => apiClient.post(`/messaging/messages/${id}/mark_read/`),
};

// Service pour les notifications
export const notificationService = {
  getAll: (params?: any) => apiClient.get('/notifications/notifications/', { params }),
  getUnread: () => apiClient.get('/notifications/notifications/unread/'),
  markRead: (id: number) => apiClient.post(`/notifications/notifications/${id}/mark_read/`),
  markAllRead: () => apiClient.post('/notifications/notifications/mark_all_read/'),
};

// Service pour le blog
export const blogService = {
  getAll: (params?: any) => apiClient.get('/blog/posts/', { params }),
  getById: (id: number) => apiClient.get(`/blog/posts/${id}/`),
};

// Service pour la FAQ
export const faqService = {
  getCategories: () => apiClient.get('/faq/categories/'),
  getQuestions: (params?: any) => apiClient.get('/faq/questions/', { params }),
};

// Service pour le contact
export const contactService = {
  sendMessage: (data: any) => apiClient.post('/contact/messages/', data),
};

