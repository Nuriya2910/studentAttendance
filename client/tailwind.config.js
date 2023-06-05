module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    // require("@flowbite/icons") 
  ],
  darkMode: 'class',
}
// module.exports = {

//   plugins: [
//     require('flowbite/plugin')
//   ]

// }
// module.exports = {

//   content: [
//     // ...
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
//   ]

// }