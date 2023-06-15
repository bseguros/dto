$(document).ready(function(){
    
  var sign = window.prompt('Digite a senha','');
  var md5 = $.md5(sign);

  // Testa senha MD5
  if(md5 == '0f020b70f6eff222c79c51ed6dbf19a9'){
    // Remove texto de "Aguardando senha..."
    $('#invalidpass').css('display','none');

    var data;
    $.ajax({
      type: "GET",  
      url: "https://fechine.github.io/dto/csv/dto.csv",
      dataType: "text",       
      success: function(response){
        data = $.csv.toArrays(response);
        generateHtmlTable(data);
      }   
    });
    
    function generateHtmlTable(data) {
        var html = '<table id="table-backlog"  class="table table-condensed table-hover table-striped">';
        var counttr = 0;
      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
        $.each(data, function( index, row ) {
          //bind header
          if(index == 0) {
            html += '<thead>';
            html += '<tr>';
            $.each(row, function( index, colData ) {
                html += '<th class="item'+(index+1)+'">';
                html += colData;
                html += '</th>';
            });
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
          } else {
            html += '<tr>';
              counttr++;
            $.each(row, function( index, colData ) {
                html += '<td class="item'+(index+1)+'">';
                html += colData;
                html += '</td>';
            });
            html += '</tr>';
          }
        });
        html += '</tbody>';
        html += '</table>';
        
        $('#load_table').append(html);
      }
      // Count lines of table
      $('#table-count').append(counttr);
    }
  } else {
    $('#invalidpass').text("Senha invalida, conteúdo restrito!");
  }
});

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("table-filter");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-backlog");
  tr = table.getElementsByTagName("tr");
  operacao = document.getElementById("table-filter-input").value;

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    if(operacao == "filtro-projeto"){
      td = tr[i].getElementsByTagName("td")[0];
    } else {
      td = tr[i].getElementsByTagName("td")[3];
    }
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}