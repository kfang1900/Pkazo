import { GlobalStyles as BaseStyles } from 'twin.macro';


const GlobalStyles = () => (
  <>
    <BaseStyles />
    <style>
      {
        `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        body {
          font-family: Inter
        }
        // @media (min-width: 768px) {
        //   body {
        //     font-family: Open Sans
        //   }
        // }`
      }
    </style>
  </>
);

export default GlobalStyles;
