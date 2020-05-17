const init = function () {
  document.getElementById("submit").addEventListener("click", submit);

  let video = document.getElementsByTagName("video")[0];

  // In case autoplay doesn't start the video this should
  video.play();

  // In case the loop doesn't work this will reload the video and play
  video.onended = () => {
    video.play();
  };
};

const submit = function (e) {
  const contactName = document.getElementById("contactName").value || "Not provided";
  const contactNumber = document.getElementById("contactNumber").value;
  const emailAddress = document.getElementById("emailAddress").value || "Not provided";
  const vehicleModel = document.getElementById("vehicleModel").value || "Not provided";
  const vehicleReg = document.getElementById("vehicleReg").value || "Not provided";
  const mileage = document.getElementById("mileage").value || "Not provided";
  const vehicleComments = document.getElementById("vehicleComments").value || "Not provided";
  const postalCode = document.getElementById("postalCode").value || "Not provided";

  if (!contactNumber) return;

  e.preventDefault();
  e.stopPropagation();

  let info = document.getElementById("info");
  info.textContent = "Submitting, please stand by...";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ contactName, contactNumber, emailAddress, vehicleModel, vehicleReg, mileage, vehicleComments, postalCode })
  };

  fetch("https://cashmotors.herokuapp.com/", options)
    .then(res => res.json() || res)
    .then(data => {
      if (data.success) {
        info.style = "color:green";
        info.textContent = "Your quote request was submited successfully";
        document.getElementById("form").reset();
        return;
      }

      info.style = "color:red";
      info.textContent = "An error occured while trying to submit. Try again later.";
    });
};

document.addEventListener("DOMContentLoaded", init);
