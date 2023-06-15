var menu = 
'<ul class="main-menu">'+
    '<li><a class="mn-sobre" href="index.html">Sobre a DTO</a></li>'+
    '<li><a class="mn-papeis" href="papeis.html">Papéis e responsabilidades</a></li>'+
    '<li><a class="mn-boards" href="boards.html">Boards e arquivos</a></li>'+
    '<li><a class="mn-poker" href="poker.html">DTO Poker</a></li>'+
    '<li><a class="mn-painel" href="painel.html">Painel de Gestão</a></li>'+
    '<li><a class="mn-kanban" href="kanban.html">Kanban</a></li>'+
    '<li><a class="mn-roadmap" href="roadmap.html">Roadmap</a></li>'+
    '<li><a class="mn-backlog" href="backlog.html">Backlog <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16"> <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg> </a></li>'+
    '<li><a class="mn-loker" href="https://lookerstudio.google.com/s/qEma3tK8rC0" target="_blank">Dashboard (looker)</a></li>'+
    '<li><a class="mn-pedido" href="pedido.html">Novo pedido</a></li>'+
'</ul>';

var logo =
'<span class="menu-bar"></span>'+
'<div id="logo">'+
    '<object id="rocket" data="inc/rocket.svg"></object>'+
    '<h1>DTO</h1>'+
'</div>'+
'<p class="slogan">Digital <br />Transformation <br />Office</p>';

var testeglobal = "Var global";


$( document ).ready(function() {

    // Include de partes via JS
    $(".load-logo").html(logo);
    $(".load-menu").html(menu);

    // Responsibidade no menu atraves de classe injetada
    var maxWidth = window.matchMedia("(max-width: 900px)");
    responsive(maxWidth);

    // Ajustar menu no resize
    $(window).on('resize', function(){
        responsive(maxWidth);
    });

    // Click no 3bar icon
    $(".menu-bar").on( "click", function() {
        $("#sidebar").toggleClass('menu-float');
    } );

    // Click no FAQ
    $(".pergunta").on( "click", function() {
        $(".pergunta p").slideUp();
        if($(this).find("p").css("display") != "block")
        $(this).find("p").slideDown();
    } );

});

// Funcao que injeta classe para controle de responsividade
function responsive(maxWidth) {
    if (maxWidth.matches) { 
      $('.page').addClass('responsive');
    } else {
        $('.page').removeClass('responsive');
        $("#sidebar").removeClass('menu-float');
    }
}