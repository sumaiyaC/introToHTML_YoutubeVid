var removeCartItemButtons = document.getElementsByClassName('removeButton');

for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target;
        buttonClicked.closest('.cartProduct').remove(); // cleaner than chaining parentElement
        updateCartTotal(); // update total after removing item
    });
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cartSection')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cartProduct');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('col-price')[0];
        var quantityElement = cartRow.getElementsByClassName('col-qty')[0];
        
        var price = parseFloat(priceElement.innerText.replace('$', '').trim());
        var quantity = parseInt(quantityElement.querySelector('input').value);

        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;

    // Update the total on screen
    var totalSpan = document.querySelector('.cart-total span');
    totalSpan.innerText = 'Total: $' + total.toFixed(2);
}

var quantityInputs = document.querySelectorAll('.col-qty input');

quantityInputs.forEach(function(input) {
    input.addEventListener('change', updateCartTotal);
});

