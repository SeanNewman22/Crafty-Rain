var screenWidth = 800;
            var screenHeight = 400;
            var hitCounter = 0;

            Crafty.init(800,400, document.getElementById('game'));
            
            
            var player1 = Crafty.e('Player, 2D, Canvas, Color, Solid, Twoway, Gravity, Collision')
            .attr({x: 20, y: 0, w: 30, h: 30})
            .color('#F00')
            .twoway(100)
            .gravity('Floor')
            .gravityConst(300)
            .bind("EnterFrame", function(){
              if (this.x == screenWidth)
              {
                pause();
                Crafty.e('2D, DOM, Text').attr({x:screenWidth/2, y:screenHeight/2}).text("Stage 1 Clear").textFont({size:'20px', weight:'bold'});
              }
            });
            
            Crafty.e('Floor, 2D, DOM, Color').attr({x: 0, y: 300, w: 800, h: 10}).color('#F00');
            
            function drop()
                {
                  var randomx = Math.floor((Math.random() * screenWidth) + 50);
                    Crafty.e('Drop, 2D, Canvas, Color, Solid, Gravity, Collision')
                        .attr({x: randomx, y: 0, w: 2, h: 10})
                        .color('#7afff8')
                        .gravity()
                        .gravityConst(250)
                        .checkHits('Player')
                        .bind("EnterFrame", function() {
                            if (this.y > screenHeight)
                              this.destroy();
                        })
                        .bind("HitOn", function(){
                             this.destroy();
                             hitCounter++;
                        
                            hitText.text("Hit: " + hitCounter);

                             if (hitCounter == 6)
                             {
                                  player1.x = 20;
                                  hitCounter = 0;
                                 hitText.text("Hit: " + hitCounter);
                             }
                        });
                }
            
            Crafty.bind("EnterFrame", function(){
              if (Crafty.frame() % 4 == 0)
                drop();
            });
            
            var hitText = Crafty.e('2D, DOM, Text')
              .attr({
                x: screenWidth - 100,
                y: 10
            });

            hitText.text('Hit:' + hitCounter);

            hitText.textFont({
              size: '30px',
              weight: 'bold'
            });

            function pause()
                {
                  Crafty.pause();
                }