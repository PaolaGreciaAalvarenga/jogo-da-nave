function stat(){
    $("#início").hide();

    $("#fundoGame").append("<div id= 'jogador' class= 'animal'></div>");
    $("#fundoGame").append("<div id= 'inimigo1' class= 'anima2'></div>");
    $("#fundoGame").append("<div id= 'inimigo2'  ></div>");
    $("#fundoGame").append("<div id= 'amigo' class= 'animal3'></div>");
    $("#fundoGame").append("<div id= 'placar' ></div>");
    $("#fundoGame").append("<div id= 'energia' ></div>");


    var podeAtirar = true;
    var fimdejogo = false;
    var jogo = {};
    var velocidade = 5;
    var posicaoY = parseInt(Math.random()* 334);
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var energiaAtual = 3;

    var TECLA = {
        upArrow: 38, // para cima
        downArrow: 40, // para baixo
        D: 68 // disparo

    }

    jogo.pressionou = [];
    // Verifica se o usuário pressionou alguma tecla


    var somDisparo = document.getElementById("somDisparo"); 
    var somExplosao = document.getElementById("somExplosao");   
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    // Música em loop
   
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

        $(document).keydown(function(e){
            jogo.pressionou[e.which] = true;
        });

        $(document).keyup(function(e){
            jogo.pressionou[e.which] = false;
        });


   // Game Loop
   jogo.timer = setInterval(loop, 30);

   function loop() {

    movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
    placar();
    energiaAtual();

   } // Fim do loop()

   // Função que movimenta o fundo do jogo

   function movefundo() {

    esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position", esquerda -1);

   }

   function movejogador() {

    if(jogo.pressionou[TECLA.upArrow]) {
        var topo = parsInt($("#jogador").css("top"));
        $("#jogador").css("top", topo +10);
    }
   }

   if(jogo.pressionou[TECLA.downArrow]) {
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top", topo -10);
   }

   if(jogo.pressionou[TECLA.D]) {

    disparo(); 

   }

   function moveinimigo1() {

    posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidade);
    $("#inimigi1").css("top", posicaoY)

        if(posicaoX <=0 ) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
         }

   }

   function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX -3);

        if(posicaoX <=0 ) {

            $("#inimigo2").css("left", 775);
        }
   }

   function moveamigo() {

    posicaoX = parseInt$("#amigo").css("left");
    $("#amigo").css("left", posicaoX +1);

        if(posicaoX > 906) {

            $("#amigo").css("left", 0);
        }
   }

   function disparo() {

    if(podeAtirar == true) {

        somDisparo.play();
        podeAtirar = false;

        topo = parseInt($("#jogador").css("top"));
        posicaoX = parseInt($("#jogador").css("left"));
        tiroX = posicaoX +190;
        topoTiro = topo +37;
        $("#fundoGame").append("<div id = 'disparo'></div");
        $("#disparo").css("top", topoTiro);
        $("#disparo").css("top", tiroX);

        var tempoDisparo = window.setInterval(executaDisparo, 30);

    }


    function executaDisparo() {
        posicaoX = parseInt($("#disparo").css("left"));
        $("#disparo").css("left", posicaoX +15);
        
            if(posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
    }
   }

   function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

            if(colisao1.length > 0) {

                energiaAtual--;

            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            }

            if(colisao2.length > 0) {

                energiaAtual--;
                
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            reposicionaInimigo2();

            }

            if(colisao3.length > 0) {
               
                velocidade = velocidade +0.3;
                pontos = pontos +100;
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));

                explosao1(inimigo1X, inimigo1Y);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top", posicaoY);
            
            }

            if(colisao4.length > 0) {

                pontos = pontos +50
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                $("#inimigo2").remove();

                explosao2(inimigo2X, inimigo2Y);
                $("#disparo").css("left", 950);

                reposicionaInimigo2();

            }

            if(colisao5.length > 0) {

                somResgate.play();
                salvos++;
                reposicionaAmigo();
                $("#amigo").remove();
            
            }

            if(colisao6.length > 0) {

                perdidos++;
                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));
                explosao3(amigoX, ammigoY);
                $("#amigo").remove();

                reposicionaAmigo();

            }

        }

    function explosao1(inimigo1X, inimigo1Y) {

        somExplosao.play();
        $("#fundogame").append("<div id = 'explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width: 200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

            function removeExplosao(){

                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao = null;
            
            }
    }

    function explosao2(inimigo2X, inimigo2Y) {

        somExplosao.play();
        $("#fundogame").append("<div id = 'explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width: 200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao2, 1000);

            function removeExplosao2(){

                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2 = null;
            
            }
    }
    
    
}