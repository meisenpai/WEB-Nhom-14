$(document).ready(function () {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        $('#cartItems').append('<p style="text-align: center; font-weight: bolder; font-size: 40px;">Chưa có gì trong này cả! Hãy làm đầy giỏ hàng nào</p>');
        $('#btnThanhToan').hide();
    } else {
        function calculateTotal() {
            var total = 0;
            cart.forEach(function (product) {
                var price = parseFloat(product.price.replace(/\./g, ''));
                total += price * product.quantity;
            });
            total = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            $('.fw-bold').last().text('Tổng cộng: ' + total);
            $('#thanhTien').text(total);
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
                $('#cartItems').append('<p style="text-align: center; font-weight: bolder; font-size: 40px;">Chưa có gì trong này cả! Hãy làm đầy giỏ hàng nào</p>'); gi
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
    var bankRules = {
        "Agribank": { length: 13, prefixes: ['150', '340', '130', '490', '290', '361'] },
        "BIDV": { length: 14, prefixes: ['581', '125', '601', '289', '217', '126', '124'] },
        "ViettinBank": { length: 12, prefixes: ['10', '71'] },
        "VietcomBank": { length: 13, prefixes: ['001', '002', '004', '049', '014', '030', '045', '082', '007', '056', '054', '085', '022', '097'] },
        "TechcomBank": { length: 14, prefixes: ['190', '102', '196', '191'] },
        "MB": { length: 12, prefixes: ['068', '0801', '0050', '821', '065'] }
    };

    $('#NH').change(function () {
        $('#txtTK').val('');
        $('#errTK').text('');
        $('#selectErr').text('');
    });

    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    $('#btntratien').click(function () {
        var bank = $('#NH').val();
        if (!bank) {
            $('#selectErr').text('Vui lòng chọn ngân hàng.').css("color", "red");
            return;
        }

        var accountNumber = $('#txtTK').val();
        var rule = bankRules[bank];

        if (rule) {
            if (accountNumber.length !== rule.length) {
                $('#errTK').text('Số tài khoản phải có ' + rule.length + ' chữ số.').css("color", "red");
                return;
            }

            var prefix = accountNumber.substring(0, 3);
            if (!rule.prefixes.includes(prefix)) {
                $('#errTK').text('Số tài khoản phải bắt đầu bằng một trong các số sau: ' + rule.prefixes.join(', ')).css("color", "red");
                return;
            }
        }
        clearCart();
        location.reload();
        $('#cartItems').empty();
        $('#cartItems').append('<p style="text-align: center; font-weight: bolder; font-size: 40px;">Chưa có gì trong này cả! Hãy làm đầy giỏ hàng nào</p>');
        $('#errTK').text('');
        $('#successMessage').show();
        $('#successMessage').removeClass('hidden');
        setTimeout(function () {
            $('#successMessage').addClass('hidden');
        }, 2000);
        $('#paymentModal').modal('hide');

    });
});
