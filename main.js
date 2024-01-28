// Plain vanilla JavaScript version of jQuery's slideToggle(), slideUp(), and slideDown() functions.
HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
      _s(this, duration, callback, true);
    } else {
      _s(this, duration, callback);
    }
  };
  HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
  };
  
  HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
  };
  
  function _s(el, duration, callback, isDown) {
    if (typeof duration === "undefined") duration = 400;
    if (typeof isDown === "undefined") isDown = false;
  
    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";
  
    var elStyles = window.getComputedStyle(el);
  
    var elHeight = parseFloat(elStyles.getPropertyValue("height"));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
    var elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));
  
    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;
  
    var start;
  
    function step(timestamp) {
      if (start === undefined) start = timestamp;
  
      var elapsed = timestamp - start;
  
      if (isDown) {
        el.style.height = stepHeight * elapsed + "px";
        el.style.paddingTop = stepPaddingTop * elapsed + "px";
        el.style.paddingBottom = stepPaddingBottom * elapsed + "px";
        el.style.marginTop = stepMarginTop * elapsed + "px";
        el.style.marginBottom = stepMarginBottom * elapsed + "px";
      } else {
        el.style.height = elHeight - stepHeight * elapsed + "px";
        el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + "px";
        el.style.paddingBottom =
          elPaddingBottom - stepPaddingBottom * elapsed + "px";
        el.style.marginTop = elMarginTop - stepMarginTop * elapsed + "px";
        el.style.marginBottom =
          elMarginBottom - stepMarginBottom * elapsed + "px";
      }
  
      if (elapsed >= duration) {
        el.style.height = "";
        el.style.paddingTop = "";
        el.style.paddingBottom = "";
        el.style.marginTop = "";
        el.style.marginBottom = "";
        el.style.overflow = "";
        if (!isDown) el.style.display = "none";
        if (typeof callback === "function") callback();
      } else {
        window.requestAnimationFrame(step);
      }
    }
  
    window.requestAnimationFrame(step);
  }
  
  // JS
  const overlays = document.querySelector(".overlay");
  const body = document.querySelector("body");
  const menuBtn = document.querySelector(".menu-btn");
  const menuItems = document.querySelector(".menu-items");
  
  // Add class to a tag and ul tag if li parent contains sub-menu
  const liElems = document.querySelectorAll(".menu-items li");
  liElems.forEach((elem) => {
    const childrenElems = elem.querySelectorAll(".dropdown-menu");
    if (childrenElems.length > 0) {
      elem.firstElementChild.classList.add("expand-btn");
      elem.classList.add("dropdown");
    }
  });
  
  function toggle() {
    // disable overflow body
    body.classList.toggle("overflow");
    // dark background
    overlays.classList.toggle("overlay--active");
    // add open class
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
  }
  
  // Open Menu Mobile
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });
  
  // Closes when the Esc key is pressed
  window.onkeydown = function (event) {
    const key = event.key; // const {key} = event; in ES6+
    const active = menuItems.classList.contains("open");
    if (key === "Escape" && active) {
      toggle();
    }
  };
  
  // Closes when clicked outside the area
  document.addEventListener("click", (e) => {
    let target = e.target,
      its_menu = target === menuItems || menuItems.contains(target),
      its_hamburger = target === menuBtn,
      menu_is_active = menuItems.classList.contains("open");
    if (!its_menu && !its_hamburger && menu_is_active) {
      toggle();
    }
  });
  
  // Mobile menu expand
  const expandBtn = document.querySelectorAll(".expand-btn");
  expandBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        // Prevent Default Anchor Click Behavior
        event.preventDefault();
        btn.classList.toggle("open");
        btn.nextElementSibling.slideToggle(300);
      }
    });
  });
  
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      // Off menu mobile on desktop
      if (menuBtn.classList.contains("open")) {
        toggle();
      }
      // Change arrow menu on Desktop
      for (var i = 0; i < expandBtn.length; i += 1) {
        expandBtn[i].classList.remove("open");
      }
      // Off SlideToggle Menu on Desktop
      const dropdownMenu = document.querySelectorAll(
        ".menu-items .dropdown-menu"
      );
      for (var i = 0; i < dropdownMenu.length; i += 1) {
        dropdownMenu[i].style.display = "";
      }
    }
  });


// Below Code For Hero section Particle scripts
  function Particle(x, y, c, s) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.s = s;
      this.c = c;
      this.sc = c;
      this.sx = x;
      this.sy = y;
      this.time = Date.now();
  }

  Particle.prototype = {
      constructor: Particle,
      update: function () {
          this.x += this.vx;
          this.y += this.vy;
          this.vx = (this.sx - this.x) / 10;
          this.vy = (this.sy - this.y) / 10;
      },
      render: function (context) {
          context.beginPath();
          context.shadowBlur = 1;
          context.shadowColor = this.c;
          context.fillStyle = this.c;
          context.fillRect(this.x, this.y, this.s, this.s);
          context.closePath();
      }
  };

  class ImageDate {
      #Date;
      constructor(date) {
          this.#Date = date;
      }
      Data() {
          return this.#Date;
      }
  }
  var canvas = document.getElementById('canvas');
  canvas.willReadFrequently = true;
  var context = canvas.getContext('2d');
  // var imageDates = [];
  var imageParticles = [];
  var particle_size = 3;
  var arr = []
  var height = canvas.height = 512;
  var width = canvas.width = 512;
  var lastUpdateTime = Date.now();
  var images = ["innak.webp", "question-mark.webp", "code1.webp", "ar.webp"];
  var loadImage = (src) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
      });
  };

  var imageCount = 0;
  Promise.all(images.map(src => loadImage(`${src}`)))
      .then(images => {
          images.forEach(img => {
              context.drawImage(img, 0, 0);
              var imageData = context.getImageData(0, 0, width, height);
              var data = imageData.data;
              // imageDates.push(new ImageDate(data));
              context.clearRect(0, 0, width, height);
              var particles = [];
              for (var y = 0; y < height; y += particle_size) {
                  for (var x = 0; x < width; x += particle_size) {
                      var o = x * 4 + y * 4 * imageData.width;
                      if (data[o + 3] > 210) {
                          // var c = 'rgba(' + data[o] + ',' + data[o + 1] + ',' + data[o + 2] + ',' + data[o + 3] + ')';
                          var c = "#1EE1FF";
                          var p = new Particle(x, y, c, 1);
                          p.x = Math.random() * width;
                          p.y = Math.random() * height;
                          if (imageCount === 0) {
                              arr.push(p);
                          }
                          particles.push(p);          
                      }
                  }
              }
              imageParticles.push(particles);
              // imageParticles.push(arr);
              imageCount++;
              if (imageCount === images.length) {
                  // console.log("imageParticles:", imageParticles);
                  update();
                  render();
              }
          });
      })
      .catch(error => {
          console.error("Error loading images:", error);
      });


  var change = 0;
  var count = 0;

  function update() {
      var currentTime = Date.now();
      var elapsedTime = currentTime - lastUpdateTime;

      for (var i = 0, l = arr.length; i < l; i++) {
          arr[i].update();
      }

      if (count === 0 || elapsedTime > 2000) {
          if (count !== 0) {
              imageParticles.forEach((particles, index) => {
                  var d = 0;
                  if(index === 0){
                      arr = particles.slice();
                  }
                  else if (index === change) {
                      if (particles.length < arr.length) {
                          d = arr.length - particles.length;
                          if (d === 0) {
                              for (var i = 0; i < particles.length; i++) {
                                  arr[i].sx = particles[i].sx;
                                  arr[i].sy = particles[i].sy;
                                  arr[i].c = particles[i].c;
                              }
                          } 
                          else {
                              for (var i = 0; i < arr.length; i++) {
                                  if (i < particles.length) {
                                      arr[i].sx = particles[i].sx;
                                      arr[i].sy = particles[i].sy;
                                      arr[i].c = particles[i].c;
                                  } else {
                                      arr.splice(i, d);
                                      i--;
                                  }
                              }
                          }
                      }
                      else {
                          d = particles.length - arr.length;
                          if (d === 0) {
                              for (var i = 0; i < arr.length; i++) {
                                  arr[i].sx = particles[i].sx;
                                  arr[i].sy = particles[i].sy;
                                  arr[i].c = particles[i].c;
                              }
                          } else {
                              for (var i = 0; i < particles.length; i++) {
                                  if (i < arr.length) {
                                      arr[i].sx = particles[i].sx;
                                      arr[i].sy = particles[i].sy;
                                      arr[i].c = particles[i].c;
                                  } else {
                                      arr.push(particles[i]);
                                  }
                              }
                          }
                      }
                  }
              });

              if (change < images.length - 1) {
                  change++;
              } else {
                  change = 0;
              }
          }
          lastUpdateTime = currentTime;
          count = 1;
      }
      setTimeout(update, 1);
  }



  function render() {
      context.clearRect(0, 0, width, height);
      for (var i = 0, l = arr.length; i < l; i++) {
          arr[i].render(context);
      }
      requestAnimationFrame(render);
  }
