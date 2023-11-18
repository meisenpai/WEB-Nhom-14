var currentPage = 1;

// Khi trang được tải, đặt trang đầu tiên là trang active
window.onload = function () {
    showPage(currentPage);
};

function showPage(pageNumber) {
    document.getElementById("page" + currentPage).style.display = "none";
    document.getElementById("page" + pageNumber).style.display = "block";

    // Thay đổi trang active
    document
        .querySelector(".pagination .page-item.active")
        .classList.remove("active");
    document
        .querySelector(
            ".pagination .page-item:nth-child(" + (pageNumber + 1) + ")"
        )
        .classList.add("active");

    currentPage = pageNumber;
    document.getElementById("prevPage").style.display =
        currentPage === 1 ? "none" : "block";
    document.getElementById("nextPage").style.display =
        currentPage === 3 ? "none" : "block";
}

document
    .getElementById("nextPage")
    .addEventListener("click", function () {
        if (currentPage < 3) {
            showPage(currentPage + 1);
        }
    });

document
    .getElementById("prevPage")
    .addEventListener("click", function () {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

$(document).ready(function () {
    $("#addToCart").click(function () {
        var productImage = $(this).parent().parent().find("img").attr("src");
        var productName = $(this).parent().parent().find("h5").text();
        var productPrice = $(this).parent().parent().find("p").text();

        var product = {
            image: productImage,
            name: productName,
            price: productPrice,
            quantity: 1,
        };

        var cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    });
});