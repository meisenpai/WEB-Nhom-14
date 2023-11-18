document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const fullNameInput = document.getElementById("registerFirstName");
  const phoneInput = document.getElementById("registerPhone");
  const passwordInput = document.getElementById("registerPassword");
  const confirmPasswordInput = document.getElementById("registerrePassword");

  function isFullNameValid() {
    const fullName = fullNameInput.value.trim();
    return fullName.includes(" ");
  }

  function isPhoneValid() {
    const phone = phoneInput.value.trim();
    return /^\d{10}$/.test(phone);
  }

  function isUsernameValid() {
    const username = document.getElementById("registerUsername").value.trim();
    return /^[a-zA-Z0-9_]+$/.test(username);
  }

  function arePasswordsMatching() {
    return passwordInput.value === confirmPasswordInput.value;
  }

  function updateValidation() {
    const fullNameValid = isFullNameValid();
    const phoneValid = isPhoneValid();
    const passwordsMatch = arePasswordsMatching();
    const usernameValid = isUsernameValid();

    fullNameInput.setCustomValidity(
      fullNameValid ? "" : "Họ tên phải nhập đầy đủ họ và tên."
    );
    phoneInput.setCustomValidity(
      phoneValid ? "" : "Số điện thoại phải là số và có 10 chữ số."
    );
    confirmPasswordInput.setCustomValidity(
      passwordsMatch ? "" : "Mật khẩu và xác nhận mật khẩu không khớp."
    );
    document
      .getElementById("registerUsername")
      .setCustomValidity(
        usernameValid
          ? ""
          : "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới."
      );
  }

  fullNameInput.addEventListener("input", updateValidation);
  phoneInput.addEventListener("input", updateValidation);
  passwordInput.addEventListener("input", updateValidation);
  confirmPasswordInput.addEventListener("input", updateValidation);
  document
    .getElementById("registerUsername")
    .addEventListener("input", updateValidation);

  form.addEventListener("submit", function (event) {
    if (!isFullNameValid() || !isPhoneValid() || !arePasswordsMatching()) {
      event.preventDefault();
      updateValidation();
    }
  });
});
