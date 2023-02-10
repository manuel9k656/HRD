$('#work_order_table tfoot th').each(function (index, value) {
    var name = $('#work_order_table thead').find('th:eq(' + index + ')').html();
    $("div#work_order_table_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
    if ($(this)[0] != $('#work_order_table thead th').last()[0]) {
        $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
    }
});
$('a.toggle-vis').on('click', function (e) {
    e.preventDefault();
    var column = work_order_table.column($(this).attr('data-column'));
    column.visible(!column.visible());
});
var work_order_table = $('#work_order_table').DataTable({
    colReorder: true,
    dom: '<"toolbar"><"top"Bf>rt<"bottom"lip>',
    pageLength: 50,
    order: [
        [0, 'desc']
    ],
  buttons: [
      {
        text: '<i class="fas fa-plus"></i> Agregar Orden',
        className: 'btn-sm btn-info',
        action: function (e, dt, node, config) {
            window.location.href = '/dis/public/workorder/new_work_orders'

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
              work_order_table.clear().draw();
              work_order_table.ajax.reload();
          }
      }
  ],
  ajax: {
      method: "POST",
      url: 'work_order_table',
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
    {'data':'number_part'},
    {'data':'final_price'},
    {'data':'qty_po'},
    {'data':'qty_shipping'},
    {'data':'created_at'},
    {'data':'comment'},
    {'data':'options'},

],
  createdRow: function (row, data, dataIndex) {
    //
    // if (data['qty_po'] <= data['qty_shipping']) {
    //     $('td', row).eq(5).addClass('bg-success');
    // }
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

$('#NewShippingModal').on('show.bs.modal', function (e) {
    var id = $(e.relatedTarget).data('id');
    console.log(id);
    $.ajax({
        method: "POST",
        url: 'NewShippingModal',
        data: { id: id}
    })
    .done(function( data ) {
        $('#NewShippingModalContent').html(data);
    });
});




$('#close_work_order_table tfoot th').each(function (index, value) {
    var name = $('#close_work_order_table thead').find('th:eq(' + index + ')').html();
    $("div#close_work_order_table_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
    if ($(this)[0] != $('#close_work_order_table thead th').last()[0]) {
        $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
    }
});
$('a.toggle-vis').on('click', function (e) {
    e.preventDefault();
    var column = close_work_order_table.column($(this).attr('data-column'));
    column.visible(!column.visible());
});
var close_work_order_table = $('#close_work_order_table').DataTable({
    colReorder: true,
    dom: '<"toolbar"><"top"Bf>rt<"bottom"lip>',
    pageLength: 50,
    order: [
        [0, 'desc']
    ],
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
              close_work_order_table.clear().draw();
              close_work_order_table.ajax.reload();
          }
      }
  ],
  ajax: {
      method: "POST",
      url: 'close_work_order_table',
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
    {'data':'number_part'},
    {'data':'final_price'},
    {'data':'qty_po'},
    {'data':'qty_shipping'},
    {'data':'created_at'},
    {'data':'comment'},
    {'data':'date_closed'},
    {'data':'options'},

],
  createdRow: function (row, data, dataIndex) {
    //
    if (data['qty_po'] <= data['qty_shipping']) {
        $('td', row).eq(6).addClass('bg-success');
    }
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