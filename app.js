new Vue ({
  el: '#app',
    data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns:[],
      playerImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfk8PF5NMv2p0XQvNIF6LJ7-eL6R4dxa6PUoYAJWUIcO-_qupT",
      secondImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLeAL2cCE1Zj-MDKYkqIPL6chHu7X5qtc8N18ujM_DnesTCrB",
      monsterImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLEC1Uk9_njCw7LcP02R21F-UE5k9MyrumoAsHD3mxtyLxzJ9",
      secondMonster:"http://bit.ly/2ib3UFO"
    },
  methods:{
    changePerson: function() {
      this.secondImage = this.playerImage;
    },
    changeMonster:function() {
      this.monsterImage = this.secondMonster;
    },
    start: function(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.secondImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLeAL2cCE1Zj-MDKYkqIPL6chHu7X5qtc8N18ujM_DnesTCrB";
      this.monsterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLEC1Uk9_njCw7LcP02R21F-UE5k9MyrumoAsHD3mxtyLxzJ9";
    },
    attack: function(){
        var damage = this.calculateDamage(3,10);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer:true,
          text:'Player hits monster for ' + damage
        });
        if(this.wounded()) {
          return;
        }
        if (this.checkWin()) {
          return;
        }
        this.monsterAttacks();
      },

      specialAttack: function(){
        var damage = this.calculateDamage(10,20);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer:true,
          text:'Player cracks monster for ' + damage
        });
        if (this.wounded()){
          return;
        }
        if (this.checkWin()) {
          return;
        }
        this.monsterAttacks();

      },
      heal:function(){
        if (this.playerHealth <= 90) {
          this.playerHealth += 10;
        }else{
          this.playerHealth = 100;
        }
        this.turns.unshift({
          isPlayer:true,
          text:'Player heals for 10'
        });
        this.monsterAttacks();
      },
      giveUp:function(){
          this.gameIsRunning = false;
          this.turns = [];
          this.secondImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLeAL2cCE1Zj-MDKYkqIPL6chHu7X5qtc8N18ujM_DnesTCrB";
          this.monsterImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLEC1Uk9_njCw7LcP02R21F-UE5k9MyrumoAsHD3mxtyLxzJ9";

      },
      monsterAttacks:function(){
        var damage = this.calculateDamage(5,13);
        this.playerHealth -= damage;
        this.checkWin();
        this.wounded();
        this.turns.unshift({
          isPlayer:false,
          text:'Monster hits player for ' + damage
        });
      },
      calculateDamage:function(min,max){
        return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      wounded:function() {
        if (this.monsterHealth <= 50) {
          this.changeMonster();
          // alert("Monster is wounded");
        }else if (this.playerHealth <= 50) {
          this.changePerson();
          // alert("Your wounded");
        }
        return;
      },
      checkWin:function() {
        if (this.monsterHealth <= 0) {
          if(confirm('You won! New Game?')){
            this.start();
          }else{
            this.gameIsRunning = false;
          }
          return true;
        }else if (this.playerHealth <= 0) {
          if(confirm('You Lost! New Game?')){
            this.start();
          }else{
            this.gameIsRunning = false;
          }
          return true;
        }
        return false;
      }
    }
  })
