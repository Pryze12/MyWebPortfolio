document.getElementById('year').textContent = new Date().getFullYear();

    // Typing effect (robust) - types then deletes then moves to next
    (function(){
      const words = ['UI/UX Designer','Frontend Developer'];
      const el = document.getElementById('typed-text');
      const delay = 50; // typing speed
      const pause = 500; // pause after typed
      let wIndex = 0, charIndex = 0, direction = 1;

      function tick(){
        const current = words[wIndex];
        if(direction === 1){
          charIndex++;
          el.textContent = current.slice(0,charIndex);
          if(charIndex === current.length){
            direction = -1;setTimeout(tick,pause);return;
          }
        } else {
          charIndex--;
          el.textContent = current.slice(0,charIndex);
          if(charIndex === 0){
            direction = 1; wIndex = (wIndex+1)%words.length;
          }
        }
        setTimeout(tick, direction===1 ? delay : Math.max(50,delay/1.5));
      }
      tick();
    })();

    // Skills slider pause on hover
    (function(){
      const track = document.getElementById('slider-track');
      let running = true;
      track.addEventListener('mouseenter', ()=>{track.style.animationPlayState='paused'});
      track.addEventListener('mouseleave', ()=>{track.style.animationPlayState='running'});
    })();

    // Contact form validation (simple front-end demo)
(function(){
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  // Custom messages per field
  const messages = {
    name: "Please enter your name.",
    email: "Please enter your email address.",
    message: "Please enter your message."
  };

  function showWarn(el, show){
    const warn = document.getElementById('warn-'+el.id);
    if(show){
      warn.textContent = messages[el.id] || "Please fill up this field.";
      warn.style.display = 'block';
    } else {
      warn.style.display = 'none';
    }
  }

  [name,email,message].forEach(i=>{
    i.addEventListener('input', ()=>{
      showWarn(i, !i.value.trim());
    });
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;

    [name,email,message].forEach(i=>{
      if(!i.value.trim()){
        showWarn(i,true);
        ok = false;
      } else {
        showWarn(i,false);
      }
    });

    if(!ok) return;

    // success stub
    document.getElementById('form-success').style.display='block';
    setTimeout(()=>{
      document.getElementById('form-success').style.display='none';
      form.reset()
    },1500);
  });
})();
