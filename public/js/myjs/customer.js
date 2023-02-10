$('#active_customers tfoot th').each(function (index, value) {
    var name = $('#active_customers thead').find('th:eq(' + index + ')').html();
    $("div#active_customers_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
    if ($(this)[0] != $('#active_customers thead th').last()[0]) {
        $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
    }
});
$('a.toggle-vis').on('click', function (e) {
    e.preventDefault();
    var column = active_customers.column($(this).attr('data-column'));
    column.visible(!column.visible());
});
var active_customers = $('#active_customers').DataTable({
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
          className: 'btn btn-sm btn-success',
          text: '<i class="fas fa-file-excel"></i> Excel'
      },
      {
          extend: 'pdf',
          className: 'btn btn-sm btn-info',
          text: '<i class="fas fa-file-pdf"></i> PDF'
      },
      {
          extend: 'print',
          className: 'btn btn-sm btn-secondary',
          text: '<i class="fas fa-print"></i> Print'
      },
      {
          extend: 'copy',
          className: 'btn btn-sm btn-warning',
          text: '<i class="fas fa-print"></i> Copiar'
      },
      {
          text: '<i class="fas fa-redo"></i>',
          className: 'btn-sm btn-success',
          action: function (e, dt, node, config) {
              active_customers.clear().draw();
              active_customers.ajax.reload();
          }
      }
  ],
  ajax: {
      method: "POST",
      url: 'active_customers',
      error: function() {
      },
      beforeSend: function() {
      }
  },
  rowId: 'client_id',
  columns: [
    {'data':'client_id'},
    {'data':'customer'},
    {'data':'contact'},
    {'data':'email'},
    {'data':'telephone'},
    {'data':'client_type'},
    {'data':'currency_type'},
    {'data':'currency_type'},
    {'data':'hits'},
    {'data':'suplier_code'},
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