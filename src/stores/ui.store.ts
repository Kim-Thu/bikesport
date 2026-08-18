import { create } from "zustand";

interface UiState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  activeModal: string | null;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  setSearchOpen: (isOpen: boolean) => void;
  setCartOpen: (isOpen: boolean) => void;
  setActiveModal: (modal: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  activeModal: null,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
  setCartOpen: (isCartOpen) => set({ isCartOpen }),
  setActiveModal: (activeModal) => set({ activeModal }),
}));
