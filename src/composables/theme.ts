import { ref, watch } from 'vue';

const isDarkTheme = ref(false);

const updateTheme = () => {
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

watch(isDarkTheme, () => {
  updateTheme();
});

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDarkTheme.value = savedTheme === 'dark' || (!savedTheme && prefersDark);

    updateTheme();
  };

  return {
    isDarkTheme,
    initTheme,
  };
}
