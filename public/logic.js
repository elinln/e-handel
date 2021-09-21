const purchaseButton = document.getElementById('puchase_button')

let stripe = Stripe('pk_test_51JbgfPCB4BGOldQPscttff0yC0UX2zKEgPJkjLeNu2UyFqO5DtOIHGAK7UE3jHCKUNHxEO8XEVW23uMmFPtRP5P000ZaMfINHj');


purchaseButton.addEventListener('click', async () => {
    const response = await fetch('/api/session/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const { id } = await response.json();
    console.log(stripe);
    stripe.redirectToCheckout({ sessionId: id });

});


