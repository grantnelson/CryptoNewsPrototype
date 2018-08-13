$(document).ready(function() {
  
  var data = [
    {"id":1,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":2,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":3,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":4,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":5,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":6,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":7,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":8,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":9,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":10,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":11,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":12,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":13,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":14,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":15,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":16,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":17,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":18,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":19,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":20,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
    {"id":21,"ticker":"XYO","token_name":"XY Oracle","status":"VERIFIED","country":"USA","ip_address":"https://xyo.network/"},
  ];
  
  
  function format (data) {
      return '<div class="details-container">'+
          '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
              '<tr>'+
                  '<td class="title">Person ID:</td>'+
                  '<td>'+data.id+'</td>'+
              '</tr>'+
              '<tr>'+
                  '<td class="title">Name:</td>'+
                  '<td>'+data.ticker + ' ' + data.token_name +'</td>'+
                  '<td class="title">status:</td>'+
                  '<td>'+data.status+'</td>'+
              '</tr>'+
              '<tr>'+
                  '<td class="title">Country:</td>'+
                  '<td>'+data.country+'</td>'+
                  '<td class="title">IP Address:</td>'+
                  '<td>'+data.ip_address+'</td>'+
              '</tr>'+
          '</table>'+
        '</div>';
  };
  
  var table = $('.datatables').DataTable({
    // Column definitions
    columns : [
      {
        className      : 'details-control',
        defaultContent : '',
        data           : null,
        orderable      : false
      },
      {data : 'ticker'},
      {data : 'token_name'},
      {data : 'status'}
    ],
    
    data : data,
    
    pagingType : 'full_numbers',
    
    // Localization
    language : {
      emptyTable     : 'No! The table is empty.',
      zeroRecords    : 'Zero Records.',
      thousands      : ',',
      processing     : 'Processing...',
      loadingRecords : 'Loading...',
      info           : 'Info _PAGE_ / _PAGES_',
      infoEmpty      : 'Info 0 / 0',
      infoFiltered   : '(Info _MAX_ Filtered)',
      infoPostFix    : '',
      lengthMenu     : 'Amount Displayed _MENU_',
      search         : 'Search:',
      paginate       : {
        first    : 'First',
        last     : 'Last',
        next     : ' > ',
        previous : ' < '
      },
      aria : {
        sortAscending  : ' Sort Ascending',
        sortDescending : ' Sort Descending'
      }
    }
  });
 
  $('.datatables tbody').on('click', 'td.details-control', function () {
     var tr  = $(this).closest('tr'),
         row = table.row(tr);
    
     if (row.child.isShown()) {
       tr.next('tr').removeClass('details-row');
       row.child.hide();
       tr.removeClass('shown');
     }
     else {
       row.child(format(row.data())).show();
       tr.next('tr').addClass('details-row');
       tr.addClass('shown');
     }
  });
 
});
        