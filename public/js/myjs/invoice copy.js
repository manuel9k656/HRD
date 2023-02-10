$('#invoice_table tfoot th').each(function (index, value) {
    var name = $('#invoice_table thead').find('th:eq(' + index + ')').html();
    $("div#invoice_table_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
    if ($(this)[0] != $('#invoice_table thead th').last()[0]) {
        $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
    }
});
$('a.toggle-vis').on('click', function (e) {
    e.preventDefault();
    var column = invoice_table.column($(this).attr('data-column'));
    column.visible(!column.visible());
});
var invoice_table = $('#invoice_table').DataTable({
    colReorder: true,
    dom: '<"toolbar"><"top"Bf>rt<"bottom"lip>',
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
              invoice_table.clear().draw();
              invoice_table.ajax.reload();
          }
      }
  ],
  ajax: {
      method: "POST",
      url: 'invoice_table',
      error: function() {
      },
      beforeSend: function() {
      }
  },
  rowId: 'id',
  columns: [
    {'data':'id'},
    {'data':'customer'},
    {'data':'po'},
    {'data':'number_parts'},
    {'data':'costmp'},
    {'data':'qty_part'},
    {'data':'total'},
    {'data':'date_added'},
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