(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

//Add to cart 
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const payButton = document.getElementById('pay-button');
    const payImage = document.getElementById('pay-image');
    const totalAmountWindow = document.getElementById('total-amount-window');
    const totalAmountText = document.getElementById('total-amount-text');
    const assignedSeatsText = document.getElementById('assigned-seats-text');
    const closeWindowButton = document.getElementById('close-window-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const seatForm = document.getElementById('seat-form');
    const seatInput = document.getElementById('seat-input');

    let totalPrice = 0;
    const cart = {};

    const items = {
        1: { name: 'Masala Dosa', price: 50, img: 'img/food/masalaDosa.jpeg' },
        2: { name: 'Bread Omlete', price: 25, img: 'img/food/breadOmlete.jpg' },
        3: { name: 'Ghee Rice', price: 45, img: 'img/food/gheeRice.jpg' },
        4: { name: 'Veg-Puffs', price: 15, img: 'img/food/vegpuffs.jpg' },
        5: { name: 'Curd Riec', price: 50, img: 'img/food/curdRice.jpg' },
        6: { name: 'Chicken Puffs', price: 30, img: 'img/food/chickenpuffs.jpg' },
        7: { name: 'Idly', price: 40, img: 'img/food/idly.jpg' },
        8: { name: 'Egg puffs', price: 25, img: 'img/food/eggpuffs.jpg' },
        9: { name: 'Chicken Biryani', price: 130, img: 'img/food/biryani.png' },
        10: { name: 'Sambar Rice', price: 50, img: 'img/food/sambar.png' },
        11: { name: 'Chicken fried rice', price: 100, img: 'img/food/chickenFriedRice.jpeg' },
        12: { name: 'Chicken 65', price: 75, img: 'img/food/chicken65.jpg' },
        13: { name: 'Veg Biryani', price: 110, img: 'img/food/vegbiryani.jpg' },
        14: { name: 'Veg Fried Rice', price: 90, img: 'img/food/vegfriedrice.jpg' },
        // Add other items here
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const itemId = button.dataset.itemId;
            const item = items[itemId];

            // Check if the item is already in the cart
            if (!cart[itemId]) {
                cart[itemId] = {
                    ...item,
                    quantity: 0
                };
            }

            // Update the item quantity and total price
            cart[itemId].quantity += 1;
            totalPrice += item.price;

            // Update the cart display
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        // Clear the cart items list
        cartItems.innerHTML = '';

        // Iterate through the cart items
        for (let itemId in cart) {
            const item = cart[itemId];

            // Create cart item element
            const cartItem = document.createElement('li');

            // Create image element
            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;

            // Create text element
            const text = document.createElement('span');
            text.textContent = `${item.name} - ₹${item.price} (${item.quantity}) = ₹${item.quantity * item.price}`;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-item');
            removeButton.textContent = '-';
            removeButton.addEventListener('click', () => removeItem(itemId));

            const addButton = document.createElement('button');
            addButton.classList.add('add-item');
            addButton.textContent = '+';
            addButton.addEventListener('click', () => addItem(itemId));

            // Append elements to cart item
            cartItem.appendChild(img);
            cartItem.appendChild(text);
            cartItem.appendChild(addButton);
            cartItem.appendChild(removeButton);

            // Append cart item to cart items list
            cartItems.appendChild(cartItem);
        }

        // Update the total price display
        totalPriceElement.textContent = `Total: ₹${totalPrice}`;
    }

    // function to add the items
    function addItem(itemId) {
        const item = cart[itemId];
        item.quantity += 1;
        totalPrice += item.price;
        updateCartDisplay();
    }

    // Function to remove an item from the cart
    function removeItem(itemId) {
        const item = cart[itemId];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            delete cart[itemId];
        }
        totalPrice -= item.price;
        updateCartDisplay();
    }

    function getConsecutiveSeats(numberOfSeats) {
        const seats = [];
        const startSeat = Math.floor(Math.random() * 50) + 1; // Random start seat between 1 and 50
        for (let i = startSeat; i < startSeat + numberOfSeats; i++) {
            seats.push(i);
        }
        return seats;
    }

    seatForm.addEventListener('submit', event => {
        event.preventDefault();
        const numberOfSeats = parseInt(seatInput.value);
        if (isNaN(numberOfSeats) || numberOfSeats < 1 || numberOfSeats > 4) {
            alert('Please enter a valid number of seats (1 to 4)');
            return;
        }

        const seats = getConsecutiveSeats(numberOfSeats);
        assignedSeatsText.textContent = `Assigned Seats: ${seats.join(', ')}`;

        // Show pay image and close the window
        payImage.style.display = 'block';
        // totalAmountWindow.style.display = 'none';
    });

    payButton.addEventListener('click', () => {
        totalAmountText.textContent = `Total Amount: ₹${totalPrice}`;
        totalAmountWindow.style.display = 'block';

        
    });

    closeWindowButton.addEventListener('click', () => {
        totalAmountWindow.style.display = 'none';
    });
});




