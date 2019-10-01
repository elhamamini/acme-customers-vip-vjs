let formData = {};
const destroyCustomer = (customer) => {
    customer.parentNode.remove()
}


document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
})

window.addEventListener('load', function() {
    [...document.getElementsByClassName("destroy-button")].forEach(button => {
        button.onclick = function(e) {
            destroyCustomer(e.target);
        }
    });
    [...document.getElementsByTagName('INPUT')].forEach(input => {
        input.oninput = function() {  
            if (input.type === 'checkbox') {
                if (input.checked) {
                    formData[input.name] = 'vip';
                } else {
                    formData[input.name] = 'not-vip';
                }
            } else {
                formData[input.name] = input.value;
            }
            console.log(formData);
            if (formFilled()) {
                document.getElementById('create-button').disabled = false;
            } else {
                document.getElementById('create-button').disabled = true;
            }
        }
    });
    document.getElementById('create-button').addEventListener('click', function(e) {
        if (e.target.disabled) return;
        document.getElementById('customers-list').innerHTML += Customer(formData);
        if (formData['customer-vip'] === 'vip') document.getElementById('number-of-vips').innerHTML = Number(document.getElementById('number-of-vips').innerHTML) + 1;
    });
});

const formFilled = () => (formData['customer-name'] && formData['customer-email']);

const Customer = (data) => {
    return `<div class="customer ${data['customer-vip']}">
    <div class="customer-display-email">${data['customer-name']} ${data['customer-email']}</div>
    <button onclick="function dest(e) {destroyCustomer(e.target)}" class="destroy-button">Destroy</button>
</div>`
}
