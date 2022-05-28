Module.register("MMM-Breathwork", {

    booleanActive: false,
    reminderController : 0,
    defaults: {
      messageDuration: 1 * 60 * 1000, // 1 min showing on the screen
      animationSpeed: 4 * 1000, // 4 seconds for fading
    },
  
    // ----------------------------------------------------------------------------------------------------
      //Esta funcion se ejecuta cuando el modulo se carga con exito
    start: function () {
      const self = this;
      Log.info("Now Starting module: " + self.name);
    },
  
    getStyles: function () {
      return ["MMM-Breathwork.css"];
    },
  
    getDom: function () {
  
      const wrapper = document.createElement("div");
  
      if(this.booleanActive == true){
        wrapper.innerHTML = `
        <div class="display-flex">
          <div id="MMM-Breathwork-outer-cir">
            <div id="MMM-Breathwork-inner-cir"></div>
            <div class="MMM-Breathwork-text-breathe MMM-Breathwork-text-breathe-in">Inhala</div>
            <div class="MMM-Breathwork-text-breathe MMM-Breathwork-text-breathe-out">Exhala</div>  
          </div>
          <div class="explication">Vamos a hacer un ejercicio de respiración para que te relajes y pases un día más tranquilo</div>
        </div>
        `;
      }
      return wrapper;
    },
  
      notificationReceived: function(notification, payload, sender) {
        const self = this;
          
          switch(notification){
              case "DO_BREATHWORK":
                setTimeout(function(){
                  self.sendNotification('SAY_SPEECH', "Vamos a hacer un ejercicio de respiración para que te relajes y pases un día más tranquilo");
                        setTimeout(function(){
                          self.booleanActive = true;
                          self.updateDom(self.animationSpeed);
                          for(let i = 0; i < 12; i++){
                              setTimeout(function(){
                                  if(i%2 == 0){
                                    self.sendNotification('SAY_SPEECH', "Exhala");
                                  } else{
                                    self.sendNotification('SAY_SPEECH', "Inhala");
                                  }
                                  
                                  if(i == 11){
                                      self.booleanActive = false;
                                      self.updateDom(self.updateDom());
                                  }
                              }, 5000*i);
                          }
                        }, 9000);
                }, 5000);
              break;
          }
      },
  
  });
  
