$(document).ready(function () {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        $('#cartItems').append('<p style="text-align: center; font-weight: bolder; font-size: 40px;">Chưa có gì trong này cả! Hãy làm đầy giỏ hàng nào</p>');
    } else {
        function calculateTotal() {
            var total = 0;
            cart.forEach(function (product) {
                var price = parseFloat(product.price.replace(/\./g, ''));
                total += price * product.quantity;
            });
            total = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            $('.fw-bold').last().text('Tổng cộng: ' + total);
        }
        
    
    
        cart.forEach(function (product) {
            var productElement = '<div class="row mb-3">' +
                '<div class="col-2">' +
                '<img src="' + product.image + '" alt="' + product.name + '" class="w-100 rounded-2">' +
                '</div>' +
                '<div class="col-4">' +
                '<h5 class="fw-bold">' + product.name + '</h5>' +
                '<p style="font-weight: bolder;">' + product.price + '</p>' +
                '<p style="font-weight: bolder;">Số lượng: <input style="border: none; width: 10%; font-weight: bolder;" type="number" value="' + product.quantity + '" min="1"></p>' +
                '</div>' +
                '<div class="col-2">' +
                '<button class="btn btn-danger remove btn-close"</button>' +
                '</div>' +
                '</div>';
    
            $('section').prepend(productElement);
        });
    
        calculateTotal();
    
        $(document).on('click', '.remove', function () {
            var productName = $(this).parent().parent().find('h5').text();
            cart = cart.filter(function (product) {
                return product.name !== productName;
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            $(this).parent().parent().remove();
            calculateTotal();
            if (cart.length === 0) {
                $('#cartItems').append('<p style="text-align: center; font-weight: bolder; font-size: 40px;">Chưa có gì trong này cả! Hãy làm đầy giỏ hàng nào</p>');gi
            }
        });
    
        $(document).on('change', 'input[type=number]', function () {
            var productName = $(this).parent().parent().find('h5').text();
            var quantity = $(this).val();
            cart.forEach(function (product) {
                if (product.name === productName) {
                    product.quantity = quantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            calculateTotal();
        });
    }
    
});
