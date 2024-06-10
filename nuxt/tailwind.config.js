module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        orange: {
      
          button: '#E85707',

 
        },
        dark:{
          charcoal:'#222222' 
        },

        green:{
          avo: '#E6EEEA',
          avo2: "#4e8244",
          logo:'#8DD772',
          
          brand: '#8FC15A'
        },
    },
  },
  plugins: [],
  animation: {
    'gradient-x':'gradient-x 15s ease infinite',
    'gradient-y':'gradient-y 15s ease infinite',
    'gradient-xy':'gradient-xy 15s ease infinite',
  },
  keyframes: {
    'gradient-y': {
      '0%, 100%': {
        'background-size':'100% 200%',
        'background-position':'100% 100%',
      },
      '50%': {
        'background-size':'100% 200%',
        'background-position':'100% 0',
      },
    },
    'gradient-x': {
      '0%, 100%': {
        'background-size':'200% 100%',
        'background-position':'200% 0',
      },
      '50%': {
        'background-size':'200% 100%',
        'background-position':'0 0',
      },
    },
    'gradient-xy': {
      '0%, 100%': {
        'background-size':'200% 200%',
        'background-position':'100% 0',
      },
      '50%': {
        'background-size':'200% 200%',
        'background-position':'0 100%',
      },
    }
  }
}
}
