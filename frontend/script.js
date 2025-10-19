const form = document.getElementById('paymentForm');
const responseEl = document.getElementById('response');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default GET submit

    const userName = document.getElementById('userName').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Validate
    if (!userName || !amount || !paymentMethod) {
        showResponse("Please fill all fields!", "error");
        return;
    }

    try {
        const res = await fetch('http://127.0.0.1:5000/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, amount, paymentMethod })
        });

        const data = await res.json();

        // Parse nested JSON from Lambda if needed
        let message = "";
        if (data.body) {
            const bodyObj = JSON.parse(data.body);
            message = bodyObj.message || JSON.stringify(bodyObj);
        } else {
            message = data.message || JSON.stringify(data);
        }

        showResponse(message, res.status === 200 ? "success" : "error");

    } catch (err) {
        showResponse('Error: ' + err.message, "error");
    }
});

// Function to display message with styling
function showResponse(message, type) {
    responseEl.innerText = message;
    responseEl.className = type; // use CSS classes: success / error
}
