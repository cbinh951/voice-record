// store.js
import create from 'zustand';

const useStore = create((set) => ({
  // Initial state
  loginSuccess: false,
  // Actions to modify state
  setLoginSuccess: (loginSuccess) => {
    console.log('Setting Login Success', loginSuccess);
    set({ loginSuccess });
  },
}));

export default useStore;
