/*       - JAVASCRIPT - Varsågod och ta för dig! -      */
const changeColorBtn = document.getElementById('hampusKnapp');
changeColorBtn.addEventListener('click', ()=>{
  const randomHue = Math.floor(Math.random() *360);
  changeColorBtn.style.backgroundColor = `hsl(${randomHue}, 50%, 50%)`;
});

let garfAnimation = anime({
  targets: '#garf',
  delay: 0,
  keyframes: [
    {translateY: '24'},
    {translateX: '-45'},
    {rotate: '75'},
    {translateY: '600'},
    {opacity: 0},
  ],
  autoplay: false,
})
  
function garfAppear() {

       console.log('garfield') 
      let garfield = document.getElementById('garf');
       garfield.style.display= "block";
       garfAnimation.play();     
     
}


let activate = document.querySelector('#garfBtn');
activate.addEventListener('click', () => {
    garfAppear();
});


















/*------------------------------------------------------*/

