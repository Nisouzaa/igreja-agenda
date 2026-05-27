import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { format } from 'date-fns'
import { useStore } from '@/context/store'
import { RiCloseLine } from 'react-icons/ri'

const TODAY_STR = '2026-05-25'

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  )
}

function NewEventForm({ onClose }) {
  const { addEvent, showToast } = useStore()
  const [f, setF] = useState({
    title: '', type: 'culto', date: TODAY_STR,
    time: '09:00', end: '11:00', room: 'Sala Principal',
    leader: 'Pastor Silva', capacity: 300,
  })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  const save = () => {
    if (!f.title.trim()) { showToast('Informe o nome do evento', 'error'); return }
    addEvent(f)
    showToast('Evento criado com sucesso!')
    onClose()
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Novo Evento</h2>
        <button onClick={onClose} className="btn btn-ghost p-1.5"><RiCloseLine className="text-lg" /></button>
      </div>
      <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-1">
        <Field label="Tipo">
          <select className="input" value={f.type} onChange={(e) => set('type', e.target.value)}>
            <option value="culto">Culto</option>
            <option value="formacao">Escola Bíblica / Formação</option>
            <option value="jovens">Jovens</option>
            <option value="louvor">Louvor / Ensaio</option>
            <option value="especial">Evento Especial</option>
            <option value="retiro">Retiro</option>
          </select>
        </Field>
        <Field label="Nome do evento">
          <input className="input" placeholder="Ex: Culto Dominical" value={f.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <Field label="Data">
          <input type="date" className="input" value={f.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Início">
            <input type="time" className="input" value={f.time} onChange={(e) => set('time', e.target.value)} />
          </Field>
          <Field label="Término">
            <input type="time" className="input" value={f.end} onChange={(e) => set('end', e.target.value)} />
          </Field>
        </div>
        <Field label="Local">
          <select className="input" value={f.room} onChange={(e) => set('room', e.target.value)}>
            <option>Sala Principal</option>
            <option>Sala 2</option>
            <option>Auditório</option>
            <option>Sala de Oração</option>
            <option>Sala Infantil</option>
            <option>Sítio da Igreja</option>
          </select>
        </Field>
        <Field label="Responsável">
          <select className="input" value={f.leader} onChange={(e) => set('leader', e.target.value)}>
            <option>Pastor Silva</option>
            <option>Pastor André</option>
            <option>Diácono Paulo</option>
            <option>Líder Bruna</option>
            <option>Maria Alves</option>
          </select>
        </Field>
        <Field label="Capacidade máxima">
          <input type="number" className="input" value={f.capacity} onChange={(e) => set('capacity', Number(e.target.value))} />
        </Field>
      </div>
      <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-cream-100 dark:border-gray-800">
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" onClick={save}>Salvar evento</button>
      </div>
    </>
  )
}

function NewCounselingForm({ onClose }) {
  const { addCounseling, showToast } = useStore()
  const [f, setF] = useState({ name: '', subject: '', date: TODAY_STR, time: '09:00', pastor: 'Pastor Silva' })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  const save = () => {
    if (!f.name.trim()) { showToast('Informe o nome', 'error'); return }
    const initials = f.name.split(' ').slice(0,2).map((n) => n[0]).join('').toUpperCase()
    addCounseling({ ...f, avatar: initials })
    showToast('Aconselhamento agendado!')
    onClose()
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Agendar Aconselhamento</h2>
        <button onClick={onClose} className="btn btn-ghost p-1.5"><RiCloseLine className="text-lg" /></button>
      </div>
      <div className="space-y-4">
        <Field label="Nome do solicitante">
          <input className="input" placeholder="Nome completo" value={f.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Assunto">
          <input className="input" placeholder="Ex: Orientação familiar" value={f.subject} onChange={(e) => set('subject', e.target.value)} />
        </Field>
        <Field label="Data">
          <input type="date" className="input" value={f.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="Horário">
          <input type="time" className="input" value={f.time} onChange={(e) => set('time', e.target.value)} />
        </Field>
        <Field label="Pastor responsável">
          <select className="input" value={f.pastor} onChange={(e) => set('pastor', e.target.value)}>
            <option>Pastor Silva</option>
            <option>Pastor André</option>
          </select>
        </Field>
      </div>
      <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-cream-100 dark:border-gray-800">
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" onClick={save}>Agendar</button>
      </div>
    </>
  )
}

export default function Modal() {
  const { modalOpen, closeModal } = useStore()

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={  { opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-medium border border-cream-200 dark:border-gray-800 p-6 w-full max-w-md"
          >
            {modalOpen === 'new-event'       && <NewEventForm onClose={closeModal} />}
            {modalOpen === 'new-counseling'  && <NewCounselingForm onClose={closeModal} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
