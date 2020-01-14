var product = {} || product;

product.drawTable = function(){
    $.ajax({
        url:'http://localhost:3000/products',
        method : 'GET',
        dataType : 'json',
        success : function(data){
            $('#tbProduct').empty();
            $.each(data, function(i, v){
                $('#tbProduct').append(
                    "<tr>"+
                        "<td>" + v.id + "</td>" +
                        "<td>" + v.Name + "</td>" +
                        "<td>" + v.Manufacture + "</td>" +
                        "<td>" + v.Description + "</td>" +
                        "<td>" +
                            "<a href='javascript:;' title='edit' onclick=product.getDetail(" + v.id + ")><i class='fa fa-eye'></i></a> " +
                            "<a href='javascript:;' title='Delete' onclick=product.delete(" + v.id + ")><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                    "</tr>"
                );
            });
        }
    });
};

product.showModal = function(){
    product.reset();
    $('#addEditProduct').modal('show');
};

product.save = function(){
    if($('#fromProduct').valid()){
        var productObj = {};
        productObj.Name = $('#Name').val();
        productObj.Manufacture = $('#Manufacture').val();
        productObj.Description = $('#Description').val();

        $.ajax({
            url:'http://localhost:3000/products',
            method : 'POST',
            dataType : 'json',
            data: JSON.stringify(productObj),
            contentType: 'application/json',
            success : function(data){
                $('#addEditProduct').modal('hide');
                product.drawTable();
            }
        });
    }
};

product.reset = function(){
    $('#Name').val('');
    $('#Manufacture').val('');
    $('#Description').val('');
    $('#addEditProduct').find('.modal-title').text('Add Product');
}

product.init = function(){
    product.drawTable();
};

product.delete = function(id){
    bootbox.confirm({
        message: "Are you sure to delete this product?",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: 'http://localhost:3000/products/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        product.drawTable();
                    }
                });
            }
        }
    });
};

product.getDetail = function (id) {
    product.reset();
    $.ajax({
        url: 'http://localhost:3000/products/' + id,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#Name').val(data.Name);
            $('#Manufacture').val(data.Manufacture);
            $('#Description').val(data.Description);

            $('#addEditProduct').find('.modal-title').text('Update Product');
            $('#addEditProduct').modal('show');
        }
    });
};

$(document).ready(function(){
    product.init();
});