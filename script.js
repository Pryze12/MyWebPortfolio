document.addEventListener("DOMContentLoaded", function(){

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect
  (function(){
    const words = ['UI/UX Designer','Frontend Developer'];
    const el = document.getElementById('typed-text');
    const delay = 50;
    const pause = 500;
    let wIndex = 0, charIndex = 0, direction = 1;

    function tick(){
      const current = words[wIndex];
      if(direction === 1){
        charIndex++;
        el.textContent = current.slice(0,charIndex);
        if(charIndex === current.length){
          direction = -1; setTimeout(tick,pause); return;
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
    if(track){  
      track.addEventListener('mouseleave', ()=> track.style.animationPlayState='running');
    }
  })();

  // Contact form validation
  (function(){
    const form = document.getElementById('contactForm');
    if(!form) return; 
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

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
      i.addEventListener('input', ()=> showWarn(i, !i.value.trim()));
    });

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;
      [name,email,message].forEach(i=>{
        if(!i.value.trim()){ showWarn(i,true); ok=false; }
        else { showWarn(i,false); }
      });
      if(!ok) return;

      // success
      document.getElementById('form-success').style.display='block';
      setTimeout(()=>{
        document.getElementById('form-success').style.display='none';
        form.reset()
      },1500);
    });
  })();

  // Project modal
  (function(){
    const projects = document.querySelectorAll('.project');
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalLangs = document.getElementById('modal-langs');
    const modalClose = document.querySelector('.modal-close');

    if(!modal) return; // safety check

    projects.forEach(project => {
      project.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = project.dataset.img;
        modalTitle.textContent = project.dataset.title;
        modalDesc.textContent = project.dataset.desc;

        // Languages
        modalLangs.innerHTML = '';
        project.dataset.langs.split(',').forEach(lang => {
          const span = document.createElement('span');
          span.textContent = lang.trim();
          modalLangs.appendChild(span);
        });
      });
    });

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if(e.target === modal){
        modal.style.display = 'none';
      }
    });
  })();

  // Sidebar toggle (for mobile/tablet)
  (function(){
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.close-btn');

    if(hamburger && sidebar && closeBtn){
      hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
      });

      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });

      // Close when clicking outside
      window.addEventListener('click', (e) => {
        if (e.target === sidebar) {
          sidebar.classList.remove('active');
        }
      });
    }
  })();

});
