import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const fmtDate = (str, pat = "d 'de' MMMM") =>
  format(parseISO(str), pat, { locale: ptBR })

export const fmtDateFull = (str) =>
  format(parseISO(str), "EEEE, d 'de' MMMM", { locale: ptBR })

export const relativeDate = (str) => {
  const d = parseISO(str)
  if (isToday(d))    return 'Hoje'
  if (isTomorrow(d)) return 'Amanhã'
  if (isThisWeek(d, { locale: ptBR })) return format(d, 'EEEE', { locale: ptBR })
  return fmtDate(str)
}

export const getInitials = (name) =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()

export const avatarStyle = (color) => ({
  backgroundColor: color + '22',
  color,
})

export const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0)

export const TYPE_LABEL = {
  culto:    'Culto',
  formacao: 'Formação',
  jovens:   'Jovens',
  louvor:   'Louvor',
  especial: 'Especial',
  retiro:   'Retiro',
}

export const TYPE_BADGE = {
  culto:    'badge-blue',
  formacao: 'badge-gold',
  jovens:   'badge-green',
  louvor:   'badge-gold',
  especial: 'badge-red',
  retiro:   'badge-green',
}

export const STATUS_LABEL = {
  confirmed: 'Confirmado',
  pending:   'Pendente',
  cancelled: 'Cancelado',
}

export const STATUS_BADGE = {
  confirmed: 'badge-green',
  pending:   'badge-gold',
  cancelled: 'badge-red',
}

export const ROOM_STATUS = {
  available: { label: 'Disponível', textCls: 'text-sage-600',  dotCls: 'bg-sage-400' },
  occupied:  { label: 'Em uso',     textCls: 'text-red-500',   dotCls: 'bg-red-400'  },
  reserved:  { label: 'Reservado',  textCls: 'text-gold-600',  dotCls: 'bg-gold-400' },
}
