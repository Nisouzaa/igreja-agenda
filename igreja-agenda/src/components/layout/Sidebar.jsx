import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/store";
import {
  RiDashboardLine,
  RiCalendarLine,
  RiBookOpenLine,
  RiStarLine,
  RiGroupLine,
  RiDoorOpenLine,
  RiHeartLine,
  RiIdCardLine,
  RiBellLine,
  RiSettingsLine,
  RiMoonLine,
  RiSunLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiLeafLine,
} from "react-icons/ri";

const NAV = [
  {
    section: "Principal",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: RiDashboardLine,
        badge: null,
      },
      { id: "calendario", label: "Calendário", icon: RiCalendarLine, badge: 3 },
      { id: "cultos", label: "Cultos", icon: RiBookOpenLine, badge: null },
      { id: "eventos", label: "Eventos", icon: RiStarLine, badge: null },
    ],
  },
  {
    section: "Gestão",
    items: [
      {
        id: "voluntarios",
        label: "Voluntários",
        icon: RiGroupLine,
        badge: null,
      },
      { id: "salas", label: "Salas", icon: RiDoorOpenLine, badge: null },
      {
        id: "aconselhamento",
        label: "Aconselhamento",
        icon: RiHeartLine,
        badge: 2,
      },
      { id: "membros", label: "Membros", icon: RiIdCardLine, badge: null },
    ],
  },
];

export default function Sidebar() {
  const {
    currentPage,
    setPage,
    darkMode,
    toggleDark,
    sidebarCollapsed,
    toggleSidebar,
    showToast,
  } = useStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 68 : 240 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="flex-shrink-0 bg-white dark:bg-gray-900 border-r border-cream-200 dark:border-gray-800 flex flex-col overflow-hidden z-20 relative"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-cream-100 dark:border-gray-800 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-serenity-400 flex items-center justify-center flex-shrink-0 shadow-soft">
          <RiLeafLine className="text-white text-base" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                Assembleia de Deus
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Sistema de Agenda
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-cream-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
        >
          {sidebarCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            {!sidebarCollapsed && (
              <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 font-medium px-3 mb-2">
                {section}
              </p>
            )}
            <div className="space-y-0.5">
              {items.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setPage(id)}
                  title={sidebarCollapsed ? label : undefined}
                  className={`nav-item ${currentPage === id ? "active" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon className="text-lg flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 text-left text-sm whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!sidebarCollapsed && badge && (
                    <span className="badge badge-blue text-[10px] px-1.5 py-0">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-cream-100 dark:border-gray-800 p-2 space-y-0.5 flex-shrink-0">
        <button
          onClick={toggleDark}
          title={
            sidebarCollapsed
              ? darkMode
                ? "Modo claro"
                : "Modo escuro"
              : undefined
          }
          className={`nav-item ${sidebarCollapsed ? "justify-center px-0" : ""}`}
        >
          {darkMode ? (
            <RiSunLine className="text-lg" />
          ) : (
            <RiMoonLine className="text-lg" />
          )}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm whitespace-nowrap"
              >
                {darkMode ? "Modo claro" : "Modo escuro"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() => showToast("Configurações em breve")}
          className={`nav-item ${sidebarCollapsed ? "justify-center px-0" : ""}`}
        >
          <RiSettingsLine className="text-lg" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm whitespace-nowrap"
              >
                Configurações
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User */}
        <button
          onClick={() => showToast("Perfil: Pastor Silva")}
          className={`nav-item mt-2 ${sidebarCollapsed ? "justify-center px-0" : "gap-2.5"}`}
        >
          <div className="avatar w-7 h-7 bg-serenity-50 dark:bg-serenity-900 text-serenity-700 dark:text-serenity-200 text-[10px] flex-shrink-0">
            PS
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-left overflow-hidden"
              >
                <p className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">
                  Pastor Silva
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  Administrador
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
