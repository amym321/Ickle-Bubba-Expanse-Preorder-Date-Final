let test = 'http://localhost:4000';
let live = 'https://app.progryss.com';
let baseurl = live; // Switch to live in production

let globalCustomer;

// Function to check customer status
function checkCustomer() {
  {% if customer %}
    let customerId = { id: {{ customer.id | json }} };

    const checkCustomerIdInDb = async () => {
      try {
        const response = await fetch(`${baseurl}/api/get-company-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerId)
        });

        const data = await response.json();
        globalCustomer = data.object;

        if (response.status === 200) {
          document.querySelector('#HeaderMenu-member-form').style.display = 'none';
          document.querySelector('#HeaderMenu-member-area').style.display = 'flex';
          document.querySelector('#setupArea select').value = globalCustomer.relationship;
          document.querySelector('#setupArea input').value = globalCustomer.dueDate;
        } else {
          document.querySelector('#HeaderMenu-member-form').style.display = 'flex';
          document.querySelector('#HeaderMenu-member-area').style.display = 'none';
          document.querySelector('.infoPopupMessage').innerHTML = 'You are one step away from becoming a member.';
        }
      } catch (error) {
        console.log('Error fetching customer data:', error);
      }
    };

    checkCustomerIdInDb();

  {% else %}
    console.log('No user logged in');
    document.querySelector('.infoPopupMessage').innerHTML = 'For a personalized experience, <strong>LOG IN</strong> or <strong>CREATE AN ACCOUNT</strong>.';
  {% endif %}
}

checkCustomer();

// Form submission handling
let setupForm = document.getElementById('setupForm');
if (setupForm) {
  setupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const sendForm = async () => {
      const formData = new FormData(event.target);
      const formObject = {};
      formData.forEach((value, key) => { formObject[key] = value; });
console.log('hi')
      try {
        const response = await fetch(`${baseurl}/api/create-company`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject)
        });
console.log(response)
        const jsonData = await response.json();
        console.log(jsonData.message);
      } catch (error) {
        console.log('Error in sending form data:', error);
      }
    };

    sendForm();

    Redirect and recheck customer
    setTimeout(() => {
      window.location.href = "/";
      checkCustomer();
    }, 2000);
  });
}

// Edit and update button logic
let editBtn = document.querySelector('.editForm svg');
let updateBtn = document.querySelector('#setupArea .membershipButton');

if (editBtn) {
  editBtn.addEventListener('click', function() {
    document.querySelector('#area_relationship').disabled = false;
    document.querySelector('#area_dueDate').disabled = false;
    updateBtn.style.visibility = 'visible';
  });
}

if (updateBtn) {
  updateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let rel = document.querySelector('#area_relationship').value;
    let due = document.querySelector('#area_dueDate').value;

    if (!rel || !due) {
      alert('Please fill in both fields before submitting.');
      return;
    }

    let obj = { relationship: rel, due: due, id: globalCustomer._id };

    try {
      const response = await fetch(`${baseurl}/api/update-company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });

      if (response.ok) {
        document.querySelector('#area_relationship').disabled = true;
        document.querySelector('#area_dueDate').disabled = true;
        updateBtn.style.visibility = 'hidden';
      } else {
        console.log('Error updating company');
      }
    } catch (error) {
      console.log('Error updating company:', error);
    }
  });
}
