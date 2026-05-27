import { create } from 'zustand'
import { format, isSameDay, isToday, isTomorrow, isThisWeek } from 'date-fns'

const TODAY = new Date(2026, 4, 25)

const EVENTS = [
  { id: 1,  title: 'Culto Dominical Matutino',  type: 'culto',    date: '2026-05-25', time: '09:00', end: '11:00', room: 'Sala Principal',   leader: 'Pastor Silva',  confirmed: 142, capacity: 300, color: '#7BA7C4', recurring: 'Semanal' },
  { id: 2,  title: 'Escola Bíblica',             type: 'formacao', date: '2026-05-25', time: '10:30', end: '12:00', room: 'Salas 1–4',        leader: 'Diácono Paulo', confirmed: 56,  capacity: 120, color: '#C9A84C', recurring: 'Semanal' },
  { id: 3,  title: 'Culto Dominical Noturno',    type: 'culto',    date: '2026-05-25', time: '19:00', end: '21:00', room: 'Sala Principal',   leader: 'Pastor André',  confirmed: 98,  capacity: 300, color: '#7BA7C4', recurring: 'Semanal' },
  { id: 4,  title: 'Reunião de Jovens',          type: 'jovens',   date: '2026-05-27', time: '19:30', end: '21:30', room: 'Auditório',        leader: 'Líder Bruna',   confirmed: 38,  capacity: 150, color: '#6BAA8B', recurring: 'Semanal' },
  { id: 5,  title: 'Culto de Oração',            type: 'culto',    date: '2026-05-28', time: '19:00', end: '20:30', room: 'Sala Principal',   leader: 'Pastor Silva',  confirmed: 67,  capacity: 300, color: '#A07CC4', recurring: 'Semanal' },
  { id: 6,  title: 'Ensaio do Louvor',           type: 'louvor',   date: '2026-05-30', time: '15:00', end: '17:00', room: 'Sala 2',           leader: 'Maria Alves',   confirmed: 12,  capacity: 30,  color: '#C9A84C', recurring: null },
  { id: 7,  title: 'Culto Dominical Matutino',   type: 'culto',    date: '2026-06-01', time: '09:00', end: '11:00', room: 'Sala Principal',   leader: 'Pastor Silva',  confirmed: 0,   capacity: 300, color: '#7BA7C4', recurring: 'Semanal' },
  { id: 8,  title: 'Encontro de Casais',         type: 'especial', date: '2026-06-07', time: '09:00', end: '18:00', room: 'Auditório',        leader: 'Pastor Silva',  confirmed: 24,  capacity: 80,  color: '#E07070', recurring: null },
  { id: 9,  title: 'Retiro de Jovens',           type: 'retiro',   date: '2026-06-14', time: '08:00', end: '20:00', room: 'Sítio da Igreja',  leader: 'Líder Bruna',   confirmed: 18,  capacity: 50,  color: '#6BAA8B', recurring: null },
  { id: 10, title: 'Conferência de Líderes',     type: 'especial', date: '2026-06-21', time: '08:00', end: '18:00', room: 'Auditório',        leader: 'Pastor André',  confirmed: 48,  capacity: 150, color: '#C9A84C', recurring: null },
]

const VOLUNTEERS = [
  { id: 1, name: 'Maria Alves',     role: 'Louvor',    event: 'Culto Dominical Matutino', date: '2026-05-25', status: 'confirmed', color: '#7BA7C4' },
  { id: 2, name: 'João Carlos',     role: 'Recepção',  event: 'Culto Dominical Matutino', date: '2026-05-25', status: 'confirmed', color: '#C9A84C' },
  { id: 3, name: 'Lúcia Santos',    role: 'Mídia',     event: 'Culto Dominical Matutino', date: '2026-05-25', status: 'pending',   color: '#6BAA8B' },
  { id: 4, name: 'Rafael Pereira',  role: 'Segurança', event: 'Culto Dominical Matutino', date: '2026-05-25', status: 'confirmed', color: '#A07CC4' },
  { id: 5, name: 'Fernanda Costa',  role: 'Infantil',  event: 'Escola Bíblica',           date: '2026-05-25', status: 'confirmed', color: '#E07070' },
  { id: 6, name: 'Bruno Lima',      role: 'Louvor',    event: 'Culto de Oração',          date: '2026-05-28', status: 'pending',   color: '#7BA7C4' },
  { id: 7, name: 'Carla Mendes',    role: 'Recepção',  event: 'Culto de Oração',          date: '2026-05-28', status: 'confirmed', color: '#C9A84C' },
]

const COUNSELING = [
  { id: 1, name: 'Pedro Costa',     date: '2026-05-26', time: '14:00', pastor: 'Pastor Silva',  status: 'pending',   subject: 'Orientação familiar',   color: '#7BA7C4' },
  { id: 2, name: 'Ana Lima',        date: '2026-05-27', time: '10:00', pastor: 'Pastor André',  status: 'pending',   subject: 'Aconselhamento pessoal', color: '#C9A84C' },
  { id: 3, name: 'Roberto Moura',   date: '2026-05-29', time: '15:30', pastor: 'Pastor Silva',  status: 'confirmed', subject: 'Orientação vocacional',  color: '#6BAA8B' },
  { id: 4, name: 'Juliana Freitas', date: '2026-06-02', time: '09:00', pastor: 'Pastor André',  status: 'confirmed', subject: 'Questões conjugais',     color: '#A07CC4' },
]

const MEMBERS = [
  { id: 1, name: 'Carlos Ferreira',   since: '2018', cell: 'Célula Norte', status: 'active',   role: 'Diácono',    color: '#7BA7C4' },
  { id: 2, name: 'Sandra Oliveira',   since: '2020', cell: 'Célula Sul',   status: 'active',   role: 'Membro',     color: '#C9A84C' },
  { id: 3, name: 'Marcos Lima',       since: '2026', cell: 'Célula Leste', status: 'new',      role: 'Membro',     color: '#6BAA8B' },
  { id: 4, name: 'Patrícia Souza',    since: '2019', cell: 'Célula Norte', status: 'active',   role: 'Líder',      color: '#A07CC4' },
  { id: 5, name: 'Eduardo Rocha',     since: '2021', cell: 'Célula Sul',   status: 'active',   role: 'Membro',     color: '#E07070' },
  { id: 6, name: 'Beatriz Nunes',     since: '2017', cell: 'Célula Oeste', status: 'active',   role: 'Diáconisa',  color: '#C9A84C' },
  { id: 7, name: 'Thiago Almeida',    since: '2022', cell: 'Célula Leste', status: 'inactive', role: 'Membro',     color: '#888888' },
  { id: 8, name: 'Camila Torres',     since: '2023', cell: 'Célula Norte', status: 'active',   role: 'Membro',     color: '#7BA7C4' },
]

const ROOMS = [
  { id: 1, name: 'Sala Principal',  capacity: 300, type: 'Auditório',     status: 'occupied',  until: '12:00',  color: '#7BA7C4' },
  { id: 2, name: 'Sala 2',          capacity: 30,  type: 'Reuniões',      status: 'available', until: null,     color: '#6BAA8B' },
  { id: 3, name: 'Auditório',       capacity: 150, type: 'Eventos',       status: 'reserved',  until: '19:00',  color: '#C9A84C' },
  { id: 4, name: 'Sala de Oração',  capacity: 20,  type: 'Oração',        status: 'available', until: null,     color: '#A07CC4' },
  { id: 5, name: 'Sala Infantil',   capacity: 40,  type: 'Escola Bíblica',status: 'occupied',  until: '11:30',  color: '#E07070' },
  { id: 6, name: 'Sala de Mídia',   capacity: 8,   type: 'Produção',      status: 'available', until: null,     color: '#C9A84C' },
]

export const useStore = create((set, get) => ({
  // UI
  currentPage:   'dashboard',
  darkMode:      false,
  selectedDate:  TODAY,
  modalOpen:     null,
  toast:         null,
  sidebarCollapsed: false,

  // Data
  events:     EVENTS,
  volunteers: VOLUNTEERS,
  counseling: COUNSELING,
  members:    MEMBERS,
  rooms:      ROOMS,

  // UI actions
  setPage:          (page) => set({ currentPage: page }),
  toggleDark:       () => set((s) => ({ darkMode: !s.darkMode })),
  setSelectedDate:  (date) => set({ selectedDate: date }),
  openModal:        (name) => set({ modalOpen: name }),
  closeModal:       () => set({ modalOpen: null }),
  toggleSidebar:    () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  showToast: (msg, type = 'success') => {
    set({ toast: { msg, type, id: Date.now() } })
    setTimeout(() => set({ toast: null }), 2800)
  },

  // Data actions
  addEvent: (ev) =>
    set((s) => ({ events: [...s.events, { ...ev, id: Date.now(), confirmed: 0, color: '#7BA7C4' }] })),

  confirmPresence: (id) =>
    set((s) => ({ events: s.events.map((e) => e.id === id ? { ...e, confirmed: e.confirmed + 1 } : e) })),

  addCounseling: (c) =>
    set((s) => ({ counseling: [...s.counseling, { ...c, id: Date.now(), status: 'pending', color: '#7BA7C4' }] })),

  updateCounseling: (id, status) =>
    set((s) => ({ counseling: s.counseling.map((c) => c.id === id ? { ...c, status } : c) })),

  updateVolunteer: (id, status) =>
    set((s) => ({ volunteers: s.volunteers.map((v) => v.id === id ? { ...v, status } : v) })),

  addMember: (m) =>
    set((s) => ({ members: [...s.members, { ...m, id: Date.now(), status: 'new', color: '#7BA7C4' }] })),

  // Selectors
  getUpcoming: (n = 6) => {
    const todayStr = format(TODAY, 'yyyy-MM-dd')
    return get().events
      .filter((e) => e.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, n)
  },
  getByDate: (date) =>
    get().events.filter((e) => e.date === format(date, 'yyyy-MM-dd')),

  getDatesWithEvents: () =>
    new Set(get().events.map((e) => e.date)),
}))
