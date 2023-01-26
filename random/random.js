/*       - JAVASCRIPT - Varsågod och ta för dig! -      */
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
  if (document.getElementById('message-input').value.indexOf("garfield") > -1) {
       console.log('garfield') 
      let garfield = document.getElementById('garf')
       garfield.style.display= "block"
       garfAnimation.play();     
     }else{
       document.getElementById('garf').style.display = "none"
     }
}

// garfAppear(); får läggas till i event listenern som lysnar på submit-button när man skriver meddelandet























/*------------------------------------------------------*/

