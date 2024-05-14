# Schedule Generator - Alex Wilson

This is a simple time clock project that tracks the amount of time passed within a period that has passed. 

Important to note:
The time accumulated within a period may not 100% match the time stored in local storage. This is due to the way setInterval is processed
by the browser. In particular, switching to a different tab will throw the live count off. If the time clock is ran and you do not change
tabs, the values on the live counting clock and the value saved in local storage will generally be the same. 

# Technologies Used
- Vite JS
- Typescript
- HTML
- CSS 
- React
