const Button = ({ children, variation, ...props }) => (
  <button
    {...props}
    className={`title mr-3 rounded-2xl px-8 py-2 shadow-md transition duration-300 ease-in-out ${
      variation === "primary"
        ? // PRIMARY BUTTON
          "bg-gray-700 border-2 border-transparent text-white " +
          "hover:bg-gray-700 hover:text-white hover:border-gray-700 " +
          "dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:hover:border-gray-900"
        : // SECONDARY BUTTON
          "transparent border-2 border-gray-700 text-gray-700 " +
          "hover:bg-gray-700 hover:text-white " +
          "dark:hover:bg-gray-600 dark:hover:text-white"
    }`}
  >
    {children}
  </button>
);

export default Button;
