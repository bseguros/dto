$(document).ready(function(){

    var countproj = 0;
    var countprojcx = 0;
    var countprojvida = 0;
    var countprojprev = 0;
    var countprojprestamista = 0;
    var countprojvidaprev = 0;
    var countprojpvazio = 0;
    var countprojemandamento = 0;
    const demandantes = new Array();
        var demandantesoptions = '';
    const tiposdemanda = new Array();
        var tiposdemandaoptions = '';
    
    var data;
    $.ajax({
        type: "GET",  
        url: "https://fechine.github.io/dto/csv/dto.csv",
        dataType: "text",       
        success: function(response){
            data = $.csv.toArrays(response);

            /*
            [0][0]: "Nome do Projeto"
            [0][1]: "Tese de Investimento?"
            [0][2]: "Data da demanda"
            [0][3]: "Nome do demandante"
            [0][4]: "Status"
            [0][5]: "FRONT"
            [0][6]: "PRODUTO"
            [0][7]: "PROCESSO"
            -[0][8]: "IMPORTANCIA"
            -[0][9]: "PI#Status"
            [0][10]: "Status 05/2023"
            [0][11]: "CX/projetos "
            [0][12]: "CX"
            [0][13]: "Data Entrada Estudo CX"
            [0][14]: "Data Finalização Estudo CX"
            [0][15]: "Data Prevista de Finalização CX"
            [0][16]: "Time Responsável"
            [0][17]: "Status Estudo CX"
            [0][18]: "Observações CX"
            [0][19]: "Projeto"
            [0][20]: "Data Entrada Estudo Projeto"
            [0][21]: "Data Finalização Estudo Projeto"
            [0][22]: "Observações Projeto"
            [0][23]: "Departamento Solicitante"
            [0][24]: "Sustentação"
            [0][25]: "Tipos de demandas"
            */

            // Contar projetos
            countProj();
        }   
    });

    // Funcao para contar projetos
    function countProj(){
        data.forEach(function(entry) {
            // Entry é o índice da coluna, exemplo:
            // console.log(entry[12]);
            // Mostra apenas todos os itens da coluna CX (col 12)
            
            // Contador de projetos geral
            countproj++;

            // Contador de projetos de CX
            if(entry[12] === "TRUE"){
                // Ignorando os projetos finalizados
                if((entry[4] != "Finalizado") && (entry[4] != "FInalizado")){
                    //console.log(entry[4]);
                    countprojcx++
                    
                    // Contador de projetos por produto
                    if(entry[6] == "Vida") countprojvida++;
                    else if((entry[6] == "Previdência")||(entry[6] == "Previdencia")||(entry[6] == "Prev")) countprojprev++;
                    else if((entry[6] == "Vida e Previdencia")||(entry[6] == "Vida e Previdência")||(entry[6] == "Vida e Prev")) countprojvidaprev++;
                    else if(entry[6] == "Prestamista") countprojprestamista++;
                    else countprojpvazio++;

                    // Contador de projetos em andamento
                    if(entry[4] === "Estudo em andamento"){
                        countprojemandamento++;
                    }
                }

                // Constroi array demandantes
                if(demandantes.includes(entry[3]) != true){
                    demandantes.push(entry[3]);
                }

                // Constroi array de tipos de demanda
                if(tiposdemanda.includes(entry[25]) != true){
                    tiposdemanda.push(entry[25]);
                }
                
            }
        });

        //console.log(demandantes);
        // Constrói e popula select de demandantes
        demandantesoptions += '<option selected value="Selecione">Selecione</option>';
        for (var i = 1; i < demandantes.length; i++) {
            demandantesoptions += '<option value="' + demandantes[i]+ '">' + demandantes[i] + '</option>';
        }

        // Constrói e popula select de tipos de demanda
        tiposdemandaoptions += '<option selected value="Selecione">Selecione</option>';
        for (var i = 1; i < tiposdemanda.length; i++) {
            tiposdemandaoptions += '<option value="' + tiposdemanda[i]+ '">' + tiposdemanda[i] + '</option>';
        }

        // Atualiza CARDS com os dados
        $('#table-count').append(countproj -1);
        $('#table-countprojcx').append(countprojcx -1);
        $('#table-countprojcx-porcento').append("Equivale à: <strong>" + Math.round(((countprojcx -1) *100)/(countproj -1)) + "%</strong> do total de projetos");

        $('#tabela-countprojvida').append(countprojvida);
        $('#tabela-countprojvida-bar').css("width",countprojvida + "px");

        $('#tabela-countprojprev').append(countprojprev);
        $('#tabela-countprojprev-bar').css("width",countprojprev + "px");

        $('#tabela-countprojvidaprev').append(countprojvidaprev);
        $('#tabela-countprojvidaprev-bar').css("width",countprojvidaprev + "px");

        $('#tabela-countprojprestamista').append(countprojprestamista);
        $('#tabela-countprojprestamista-bar').css("width",countprojprestamista + "px");

        $('#tabela-countprojpvazio').append(countprojpvazio);
        $('#tabela-countprojpvazio-bar').css("width",countprojpvazio + "px");

        $('#table-countprojemandamento').append(countprojemandamento);

        $("#demandantes").html(demandantesoptions);
        
        $("#tiposdemanda").html(tiposdemandaoptions);
        
    }

    // Conta projeto por demandante
    $("#demandantes").on("change", function() {
        coutProjDemandante($(this).val());
    });
    function coutProjDemandante(nome){
        var count = 0;
        data.forEach(function(entry) { 
            if(entry[3] === nome){
                count++;
            }
        });
        $("#countdemandante").html(count);
    }

    // Conta projeto por tipo
    $("#tiposdemanda").on("change", function() {
        countProjTipos($(this).val());
    });
    function countProjTipos(tipo){
        var count = 0;
        data.forEach(function(entry) { 
            if(entry[25] === tipo){
                count++;
            }
        });
        $("#counttipos").html(count);
    }


    // -------------------------------------------- SLIDE
    // Montar e Abrir Slide
    var copySlide = true;
    $("#click-slide").on("click", function() {
        if(copySlide){
            // Copiar cards
            $(".card01").clone().appendTo("#slide01");
            $(".card02").clone().appendTo("#slide02");
            $(".card03").clone().appendTo("#slide03");
            $(".card06").clone().appendTo("#slide04");
            copySlide = false;
        }
        // Ativar primeiro slide
        $("#slideshow").css("display","block");
        // Executa animacao do Slide
        slide();
        slideInterval();
    });
    // Contar filhos de slideshow
    var slidescount = $('#slideshow div.slide').length;
    var slideactual = 1;
    var refreshSetInterval;
    // Intervalo do Slide
    function slideInterval(){
        refreshSetInterval = setInterval(function(){
            slide();
        }, 5000)
    }
    // Fechar Slide
    $(".fechar-slide").on("click", function(){
        $("#slideshow").css("display","none");
        // Limpar looping do setInterval
        clearInterval(refreshSetInterval);
    });
    // Rodar Slide
    function slide(){
        $('.slide').slideUp(600);
            $('#slide0' + slideactual).slideDown(600);
            if(slideactual < slidescount ){
                slideactual++;
            } else slideactual = 1;
    }

});