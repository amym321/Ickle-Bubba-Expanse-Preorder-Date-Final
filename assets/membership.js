document.addEventListener('DOMContentLoaded', function() {
let test = 'http://localhost:5000';
  let live = 'https://app.progryss.com';
  let baseurl = live;
  // let baseurl = test;
  let setupForm = document.getElementById('setupForm');

  // Function to check customer status by email
  const checkCustomerByEmail = async(email) =>{
    try {
      const response = await fetch(`${baseurl}/api/get-company-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email})
      }); 
      const data = await response.json();
      return response.status
    } catch (error) {
      console.log('Error fetching customer data:', error);
    }
  }

  let memberPopup = document.querySelector('.infoPopup');
  let formThankLocation = window.location.pathname;
  let infoPopupClose = document.querySelector('.infoPopupClose');
  // Function to check if 24 hours have passed
  function is24HoursPassed(timestamp) {
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // milliseconds in 24 hours
    return (now - timestamp) > twentyFourHours;
  }
  {% if customer %}
    const userStorageKey = 'userStorageKey';
    const popupClosedAt = localStorage.getItem(userStorageKey);
    if (popupClosedAt) {
      const timestamp = parseInt(popupClosedAt, 10);
      if (isNaN(timestamp) || is24HoursPassed(timestamp)) {
        checkCustomerByEmail({{customer.email | json }}).then((data)=> {
          if(data === 401){
            // if user is created a company then no popup will show
          }else{
            if( !formThankLocation.includes('member-form') && !formThankLocation.includes('thankyou')){
              memberPopup.style.display = 'block';
            } 
          }
        })
      }
      else{
        // nothing will happen bacause time remaining to show popup
      } 
    }else{
      checkCustomerByEmail({{customer.email | json }}).then((data)=> {
          if(data === 401){
            // if user is created a company then no popup will show
          }else{
            if( !formThankLocation.includes('member-form') && !formThankLocation.includes('thankyou')){
              memberPopup.style.display = 'block';
            } 
          }
        })
    }
  
    infoPopupClose.addEventListener("click", function(e) {
      memberPopup.style.display = "none";
      e.preventDefault();
      const now = new Date().getTime();
      localStorage.setItem(userStorageKey, now.toString());
    });
    
  {% else %}

    
    let guestStorageKey = 'guestStorageKey';
    const popupClosedAt = localStorage.getItem(guestStorageKey);
    if (popupClosedAt) {
      const timestamp = parseInt(popupClosedAt, 10);
      if (isNaN(timestamp) || is24HoursPassed(timestamp)) {
        if( !formThankLocation.includes('member-form') && !formThankLocation.includes('thankyou')){
          memberPopup.style.display = 'block';
        }
      }else{
        // nothing will happen bacause time remaining to show popup
      } 
    }else{
      if( !formThankLocation.includes('member-form') && !formThankLocation.includes('thankyou')){
        memberPopup.style.display = 'block';
      }
    }
    infoPopupClose.addEventListener("click", function(e) {
      e.preventDefault();
      memberPopup.style.display = "none";
      const now = new Date().getTime();
      localStorage.setItem(guestStorageKey, now.toString());
    });
    
  {% endif %}



  {% if customer %}
    checkCustomerByEmail({{customer.email | json }}).then((data)=> {
      console.log(data)
      if(data === 401){
        document.querySelector('#membership-form').style.display = 'none';
        document.querySelector('.site-nav__link:has(svg.icon-user)').setAttribute('href','https://ickle-bubba-sandbox.myshopify.com/pages/membership-page');
        let pdpBody = document.querySelector('body.template-product')
        pdpBody ? pdpBody.classList.add('userExist') : '';
        if(pdpBody){
          document.querySelector('div[data-name="orignalP1"]').style.display = 'block';
          document.querySelector('div[data-name="orignalP"]').style.display = 'block';
        }

        window.onload = function() {
        let collectionPrice = document.querySelectorAll('.collectionPrice');
        Array.from(collectionPrice).forEach((element)=>{
          element.classList.remove('hideCollectionPrice');
        })
        }
        
      }else{
        document.querySelector('#membership-form').style.display = 'block';
        let pdpBody = document.querySelector('body.template-product')
        pdpBody ? pdpBody.classList.add('userNotExist') : '';
        if(pdpBody){
          document.querySelector('div[data-name="orignalP1"]').style.display = 'none';
          document.querySelector('div[data-name="orignalP"]').style.display = 'none';
        }
        document.querySelector('.infoPopupMessage').innerHTML = 'You are one step away from Bubble membership - <strong>Complete here!</strong>';
      }
    })
  {% else %}
    document.querySelector('#membership-form').style.display = 'block';
    let pdpBody = document.querySelector('body.template-product')
    pdpBody ? pdpBody.classList.add('userNotExist') : '';
    document.querySelector('.infoPopupMessage').innerHTML = '<strong>Sign up</strong> to Bubble to get exclusive offers and more!';
  {% endif %}

  
  console.log(setupForm)
  // Form submission handling
  if (setupForm) {
    setupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const sendForm = async () => {
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
          if (key === 'newsletter') {
            formObject[key] = value == "on" ? "TRUE" : "FALSE";
          }else if (key === 'dueDate') {
            const date = new Date(value);
            if (!isNaN(date)) {
              formObject[key] = Math.floor(date.getTime() / 1000);
            }
          }else {
            formObject[key] = value;
          }
        });
        setTimeout(()=>{
          console.log(formObject)
        },3000)
        let checkStatus = await checkCustomerByEmail(formObject.customerEmail);
        console.log(checkStatus)
        if(checkStatus === 200){
          try {
            const response = await fetch(`${baseurl}/api/create-company`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formObject)
            });
            const jsonData = await response.json();
             window.location.href = "/pages/thankyou-page";
          } catch (error) {
            console.log('Error in sending form data:', error);
          }
        }else{
            document.querySelector('.membershipformMsg').innerHTML = 'you are already subscribe, Please login';
        }
      };
      document.querySelector('.membershipButton').disabled = true;
      sendForm();
    });
  }





  
// Edit and update button logic
// let editBtn = document.querySelector('.editForm svg');
// let updateBtn = document.querySelector('#setupArea .membershipButton');

// if (editBtn) {
//   editBtn.addEventListener('click', function() {
//     document.querySelector('#area_relationship').disabled = false;
//     document.querySelector('#area_dueDate').disabled = false;
//     updateBtn.style.visibility = 'visible';
//   });
// }

// if (updateBtn) {
//   updateBtn.addEventListener('click', async (e) => {
//     e.preventDefault();
//     let rel = document.querySelector('#area_relationship').value;
//     let due = document.querySelector('#area_dueDate').value;

//     if (!rel || !due) {
//       alert('Please fill in both fields before submitting.');
//       return;
//     }

//     let obj = { relationship: rel, due: due, id: globalCustomer._id };

//     try {
//       const response = await fetch(`${baseurl}/api/update-company`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(obj)
//       });

//       if (response.ok) {
//         document.querySelector('#area_relationship').disabled = true;
//         document.querySelector('#area_dueDate').disabled = true;
//         updateBtn.style.visibility = 'hidden';
//       } else {
//         console.log('Error updating company');
//       }
//     } catch (error) {
//       console.log('Error updating company:', error);
//     }
//   });
// }


})