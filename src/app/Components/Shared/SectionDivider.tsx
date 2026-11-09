// Horizontal line with glow for separating sections
export const SectionDivider = () => {
  return (
    <div className="w-full bg-blue-200/50 dark:bg-black flex justify-center items-center">
      <div className="w-3/4 md:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-black/50 dark:via-white/40 to-transparent" />
    </div>
  );
};
