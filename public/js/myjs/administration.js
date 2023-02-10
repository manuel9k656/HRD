$( document ).ready(function() {
    $('#users_table tfoot th').each(function (index, value) {
        var name = $('#users_table thead').find('th:eq(' + index + ')').html();
        $("div#users_table_tools").append('<a class="toggle-vis" data-column="' + index + '">' + name + '</a> / ');
        if ($(this)[0] != $('#users_table thead th').last()[0]) {
            $(this).html('<input class="form-control form-control-sm shadow" type="text" placeholder="' + name + '" />');
        }
    });
    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
        var column = users_table.column($(this).attr('data-column'));
        column.visible(!column.visible());
    });
    var users_table = $('#users_table').DataTable({
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
            text: '<i class="fas fa-plus"></i> Agregar Usuario',
            className: 'btn-sm btn-info',
            // action: function (e, dt, node, config) {
            //     //window.location.href = '/dis/public/admin/new_user'
            //     ;

    
            // }
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
                  users_table.clear().draw();
                  users_table.ajax.reload();
              }
          }
      ],
      ajax: {
          method: "POST",
          url: 'users_table',
          error: function() {
          },
          beforeSend: function() {
          }
      },
      rowId: 'id',
      columns: [
        {'data':'id'},
        {'data':'name'},
        {'data':'email'},
        {'data':'password'},
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
    

    $('#ResetModal').on('show.bs.modal', function (e) {
        var id = $(e.relatedTarget).data('id');
        var email = $(e.relatedTarget).data('email');
        console.log(id);
        $.ajax({
            method: "POST",
            url: 'resset_password',
            data: { id: id,
                     email: email
                    }
        })
        .done(function( data ) {
            $('#ResetModalContent').html(data);
        });
    });
});







