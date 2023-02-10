$('#shippings_table tfoot th').each(function (index, value) {
    var name = $('#shippings_table thead').find('th:eq(' + index + ')').html();
    $("div#shippings_table_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
    if ($(this)[0] != $('#shippings_table thead th').last()[0]) {
        $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
    }
});
$('a.toggle-vis').on('click', function (e) {
    e.preventDefault();
    var column = shippings_table.column($(this).attr('data-column'));
    column.visible(!column.visible());
});
var shippings_table = $('#shippings_table').DataTable({
    colReorder: true,
    dom: '<"top"Bf>rt<"bottom"lip>',
    pageLength: 50,
    order: [
        [0, 'desc']
    ],
    // fixedColumns:   {
    //     right: 1,
    //     left: 0
    // },
  buttons: [
    {
        className: 'btn btn-sm btn-primary',
        text: '<i class="fas fa-file-invoice-dollar"></i> Cerrar Factura',
        action: function (e, dt, node, config) {
             close_invoice_type_4(153);
        }
    },
      {
          extend: 'excel',
          className: 'btn  btn-success',
          text: '<i class="fas fa-file-excel"></i> Excel'
      },
      {
          extend: 'pdf',
          className: 'btn  btn-info',
          text: '<i class="fas fa-file-pdf"></i> PDF'
      },
      {
          extend: 'print',
          className: 'btn  btn-secondary',
          text: '<i class="fas fa-print"></i> Print'
      },
      {
          extend: 'copy',
          className: 'btn  btn-warning',
          text: '<i class="fas fa-print"></i> Copiar'
      },
      {
          text: '<i class="fas fa-redo"></i>',
          className: ' btn-success',
          action: function (e, dt, node, config) {
              shippings_table.clear().draw();
              shippings_table.ajax.reload();
          }
      }
  ],
  ajax: {
      method: "POST",
      url: 'shippings_table',
      error: function() {
      },
      beforeSend: function() {
      }
  },
  rowId: 'id',
  columns: [
    {'data':'id'},
    {'data':'work_order'},
    {'data':'customer'},
    {'data':'po'},
    {'data':'number_part'},
    {'data':'qty'},
    {'data':'created_at'},
    {'data':'invoice'},
    {'data':'options'},

],
  createdRow: function (row, data, dataIndex) {
    //
  },
  initComplete: function () {
      this.api().columns().every(function () {
          var that = this;
          $('input', this.footer()).on('keyup change clear', function () {
              if (that.search() !== this.value) {
                  that
                      .search(this.value)
                      .draw();
              }
          });
      });
  }
});


function close_invoice_type_4(client_id){
    const table= document.querySelector('table#shippings_table');
    var remisions = table.querySelectorAll('tr.select_invoice');
    let values = [];
    remisions.forEach((remision) => {+
        values.push(remision.id);
    });
    if ( values.length > 0) {
        alertify.confirm('Cerrar Factura',
                '¿Esta seguro de cerrar la factura?',
                function(){
                    $.ajax({
                            method: "POST",
                            url: "close_invoice_type_4",
                            data: { values: values,
                                client_id: client_id }
                        }).done(function( data ) {
                            if (data == 1) {
                                alertify.success('Ok');
                                window.location.reload();
                            }else{
                                alertify.error('Cancel')
                            }
                        });
                }
                , function(){ alertify.error('Cancel')});
    }else{
        alertify.error('Seleccione al menos una factura');
    }
}