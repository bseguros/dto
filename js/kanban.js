$(document).ready(function(){

    var card;
    var countpriorizacao = 0;
    var countpriorizado = 0;
    var countandamento = 0;
    var countparalisado = 0;
    var countfinalizado = 0;

    var data;
    $.ajax({
        type: "GET",  
        url: "https://bseguros.github.io/dto/csv/dto.csv",
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

            // Montar Kanban
            montarKanban();
        }   
    });

    // Funcao para montar Kanban
    function montarKanban(){
        data.forEach(function(entry) {
            // Em priorização
            // if(entry[4].includes("Orientar")){
            //     createCard(1,entry[0],entry[1],entry[3],entry[13],entry[14],entry[15],entry[25]);
            //     countpriorizacao++;
            // }
            // Priorizado
            if(entry[4].includes("Priorizado")){
                createCard(2,entry[0],entry[1],entry[3],entry[13],entry[14],entry[15],entry[25]);
                countpriorizado++;
            }
            // Em andamento
            if(entry[4].includes("andamento")){
                createCard(3,entry[0],entry[1],entry[3],entry[13],entry[14],entry[15],entry[25]);
                countandamento++;
            }
            // Em paralisado
            if(entry[4].includes("Paralisado")){
                createCard(4,entry[0],entry[1],entry[3],entry[13],entry[14],entry[15],entry[25]);
                countparalisado++;
            }
            // Finalizado
            if(entry[4].includes("Finalizado")){
                createCard(5,entry[0],entry[1],entry[3],entry[13],entry[14],entry[15],entry[25]);
                countfinalizado++;
            }
        });

        // Atualiza a contagem de cards dentro das pools do Kanban
        // $(".priorizacao span.countpool").append(countpriorizacao);
        $(".priorizado span.countpool").append(countpriorizado);
        $(".andamento span.countpool").append(countandamento);
        $(".paralisado span.countpool").append(countparalisado);
        $(".finalizado span.countpool").append(countfinalizado);
    }

    function createCard(estado,titulo,tese,demandante,dt_entrada,dt_prevista,dt_finalizacao,tipo){
        if(dt_entrada == "") dt_entrada = "00/00/0000";
        if(dt_prevista == "") dt_prevista = "00/00/0000";
        if(dt_finalizacao == "") dt_finalizacao = "00/00/0000";
        card = "<div class='kanban-card'>";
        if(estado === 5){
            card += "<div class='data'> Finalizado em: " + dt_finalizacao + "</div>";
        } else {
            card += "<div class='data'> Aberto em: " + dt_entrada + " | Previsto para: " + dt_prevista + "</div>";
        } 
        card += "<strong>" + titulo + "</strong>";
            card += "<ul>";
                card += "<li>Tese: " + tese + "</li>";
                card += "<li>Demandante: " + demandante + "</li>";
                card += "<li>Tipo: " + tipo + "</li>";
            card += "</ul>";
        card += "</div>";

        if(estado === 1){
            $(".priorizacao").append(card);
        }
        if(estado === 2){
            $(".priorizado").append(card);
        }
        if(estado === 3){
            $(".andamento").append(card);
        }
        if(estado === 4){
            $(".paralisado").append(card);
        }
        if(estado === 5){
            $(".finalizado").append(card);
        }
    }

    // Abre e fecha os cards do Kanban
    $(document).on("click", ".pool .kanban-card" , function() {
        $(this).children("ul").slideToggle();
        $(this).toggleClass("selected");
    });

    $("#click-kanbanLinha").on("click",function(){
        $(".kanban").toggleClass("kanban-line");
        if($("#click-kanbanLinha").html() == "Em linhas"){
            $("#click-kanbanLinha").html("Em colunas");
        } else {
            $("#click-kanbanLinha").html("Em linhas");
        }
    });

    $("#click-kanbanInverso").on("click",function(){
        $(".kanban").toggleClass("kanban-inverso");
        if($("#click-kanbanInverso").html() == "Sentido inverso"){
            $("#click-kanbanInverso").html("Sentido normal");
        } else {
            $("#click-kanbanInverso").html("Sentido inverso");
        }
    });
    

});