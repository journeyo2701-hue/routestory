import React, { createContext, useContext, useState, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ title: "", message: "" });
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xl max-w-md w-full relative z-10 font-sans"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2D3748] mb-1.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {options.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {options.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[#F3F5F7] hover:bg-gray-100 rounded-xl text-xs font-semibold text-gray-700 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {options.cancelText || "Cancel"}
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-[#2D3748] hover:bg-red-600 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {options.confirmText || "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
