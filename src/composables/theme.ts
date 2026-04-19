import { ref } from 'vue';

export function useTheme() {
  const isDarkTheme = ref(false);

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;

    updateTheme();
  };

  const updateTheme = () => {
    if (isDarkTheme.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDarkTheme.value = savedTheme === 'dark' || (!savedTheme && prefersDark);

    updateTheme();
  };

  return {
    isDarkTheme,
    toggleTheme,
    initTheme,
  };
}
