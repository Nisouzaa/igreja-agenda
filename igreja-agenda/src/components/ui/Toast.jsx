import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/context/store'
import { RiCheckLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'

const ICONS = {
  success: { Ic: RiCheckLine,        cls: 'text-sage-400'     },
  error:   { Ic: RiErrorWarningLine, cls: 'text-red-400'      },
  info:    { Ic: RiInformationLine,  cls: 'text-serenity-400' },
}

export default function Toast() {
  const { toast } = useStore()
  const { Ic, cls } = ICONS[toast?.type || 'success']

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={  { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3
                     bg-gray-900 dark:bg-gray-800 text-white rounded-2xl shadow-medium max-w-xs"
        >
          <Ic className={`text-lg flex-shrink-0 ${cls}`} />
          <span className="text-sm">{toast.msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
