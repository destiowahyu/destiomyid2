const Button = ({ children, variation, ...props }) => (
  <button
    {...props}
    className={`title mr-3 rounded-2xl px-8 py-2 shadow-md transition duration-300 ease-in-out ${
      variation === "primary"
        ? // PRIMARY BUTTON
          "bg-gray-700 border-2 border-transparent text-gray-100 " +
          "hover:bg-gray-700 hover:text-gray-100 hover:border-gray-700 " + // Hover untuk light mode
          "dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:hover:border-gray-900" // Hover untuk dark mode
        : // SECONDARY BUTTON
          "transparent border-2 border-gray-700 text-gray-700 " +
          "hover:bg-gray-200 hover:text-gray-100 " +
          "dark:hover:bg-gray-600 dark:hover:text-gray-100"
    }`}
  >
    {children}
  </button>
);

export default Button;
