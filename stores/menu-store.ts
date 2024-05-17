export const useMenuDrawerStore = defineStore("menuDrawer", () => {
  const isOpen = useState('isMenuDrawerOpen', () => false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return {isOpen, open, close};
});
